import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { colors, radius, shadows, spacing, typography } from "../../theme";

interface OptionPickerFieldProps {
  label: string;
  value?: string;
  placeholder: string;
  options: string[];
  error?: string;
  onSelect: (value: string) => void;
}

export function OptionPickerField({
  label,
  value,
  placeholder,
  options,
  error,
  onSelect,
}: OptionPickerFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <View style={styles.wrapper}>
        <Text style={styles.label}>{label}</Text>
        <Pressable
          onPress={() => setVisible(true)}
          style={[styles.field, error ? styles.fieldError : undefined]}
        >
          <Text style={[styles.value, !value ? styles.placeholder : undefined]}>
            {value || placeholder}
          </Text>
          <Text style={styles.chevron}>v</Text>
        </Pressable>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>

      <Modal visible={visible} transparent animationType="slide" onRequestClose={() => setVisible(false)}>
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <Pressable style={styles.sheet} onPress={() => undefined}>
            <Text style={styles.sheetTitle}>{label}</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {options.map((option) => (
                <Pressable
                  key={option}
                  onPress={() => {
                    onSelect(option);
                    setVisible(false);
                  }}
                  style={styles.option}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.sm,
  },
  label: {
    color: colors.text,
    fontFamily: typography.body,
    fontSize: 14,
  },
  field: {
    minHeight: 52,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fieldError: {
    borderColor: colors.danger,
    backgroundColor: "#FFF1F2",
  },
  value: {
    color: colors.text,
    fontFamily: typography.body,
    fontSize: 15,
  },
  placeholder: {
    color: colors.textSoft,
  },
  chevron: {
    color: colors.textMuted,
    fontSize: 16,
    fontFamily: typography.body,
  },
  error: {
    color: colors.danger,
    fontFamily: typography.body,
    fontSize: 12,
  },
  overlay: {
    flex: 1,
    backgroundColor: colors.overlayStrong,
    justifyContent: "flex-end",
  },
  sheet: {
    maxHeight: "70%",
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.lg,
    ...shadows.floating,
  },
  sheetTitle: {
    fontFamily: typography.titleSemi,
    color: colors.text,
    fontSize: 22,
  },
  option: {
    paddingVertical: spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  optionText: {
    color: colors.text,
    fontFamily: typography.body,
    fontSize: 16,
  },
});

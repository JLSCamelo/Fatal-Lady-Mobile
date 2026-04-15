import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  useWindowDimensions,
  View,
} from "react-native";

import { colors, radius, spacing, typography } from "../../theme";

interface TextFieldProps extends TextInputProps {
  label: string;
  error?: string;
  hint?: string;
  rightActionLabel?: string;
  onRightActionPress?: () => void;
}

export function TextField({
  label,
  error,
  hint,
  rightActionLabel,
  onRightActionPress,
  style,
  ...rest
}: TextFieldProps) {
  const { width } = useWindowDimensions();
  const compact = width < 420;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputShell,
          compact && styles.inputShellCompact,
          error ? styles.inputShellError : undefined,
        ]}
      >
        <TextInput
          placeholderTextColor={colors.textSoft}
          style={[
            styles.input,
            rightActionLabel ? styles.inputWithAction : undefined,
            compact && styles.inputCompact,
            style,
          ]}
          {...rest}
        />
        {rightActionLabel ? (
          <Pressable
            onPress={onRightActionPress}
            style={[styles.rightAction, compact && styles.rightActionCompact]}
          >
            <Text style={styles.rightActionText}>{rightActionLabel}</Text>
          </Pressable>
        ) : null}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {!error && hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
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
  inputShell: {
    minHeight: 52,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
  },
  inputShellCompact: {
    paddingHorizontal: spacing.md,
  },
  inputShellError: {
    borderColor: colors.danger,
    backgroundColor: "#FFF1F2",
  },
  input: {
    flex: 1,
    color: colors.text,
    fontFamily: typography.body,
    fontSize: 15,
    paddingVertical: spacing.md,
    minWidth: 0,
  },
  inputWithAction: {
    paddingRight: spacing.sm,
  },
  inputCompact: {
    fontSize: 14,
    paddingVertical: 14,
  },
  rightAction: {
    marginLeft: spacing.md,
    flexShrink: 0,
    minWidth: 62,
    alignItems: "flex-end",
  },
  rightActionCompact: {
    marginLeft: spacing.sm,
  },
  rightActionText: {
    color: colors.primary,
    fontFamily: typography.body,
    fontSize: 13,
  },
  error: {
    color: colors.danger,
    fontFamily: typography.body,
    fontSize: 12,
    lineHeight: 18,
  },
  hint: {
    color: colors.textMuted,
    fontFamily: typography.body,
    fontSize: 12,
    lineHeight: 18,
  },
});

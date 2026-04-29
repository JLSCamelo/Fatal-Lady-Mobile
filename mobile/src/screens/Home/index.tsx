import React, { useMemo, useState } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import { AppFooter } from "../../components/layout/AppFooter";
import { AppHeader } from "../../components/layout/AppHeader";
import { ProductCard } from "../../components/product/ProductCard";
import { SectionHeader } from "../../components/common/SectionHeader";
import { PrimaryButton } from "../../components/common/PrimaryButton";
import { categories } from "../../constants/categories";
import {
  benefitsBar,
  collectionBanners,
  faqItems,
  newsletterBenefits,
  sizeGuideRows,
  sizeGuideTips,
  testimonials,
} from "../../constants/content";
import { imageAssets, iconAssets } from "../../services/assets";
import { useAppStore } from "../../hooks/useAppStore";
import { getPagePadding, isCompactWidth } from "../../theme";
import { styles } from "./styles";

export function HomeScreen() {
  const navigation = useNavigation<any>();
  const { width } = useWindowDimensions();
  const { products } = useAppStore();
  const compact = isCompactWidth(width);
  const pagePadding = getPagePadding(width);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const stats = useMemo(
    () => [
      { value: "5000+", label: "Clientes Satisfeitas" },
      { value: "200+", label: "Modelos Exclusivos" },
      { value: "98%", label: "Avaliações Positivas" },
    ],
    []
  );
  const featuredProducts = useMemo(() => products.slice(0, 4), [products]);
  const stackNavigation = navigation.getParent?.() ?? navigation;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <AppHeader />

      <ImageBackground source={imageAssets.homeMainBackground} style={styles.hero} resizeMode="cover">
        <LinearGradient
          colors={["rgba(0,0,0,0.15)", "rgba(0,0,0,0.65)"]}
          style={[styles.heroOverlay, { paddingHorizontal: pagePadding }]}
        >
          <View style={styles.heroContent}>
            <Text style={[styles.heroTitle, compact && styles.heroTitleCompact]}>Elegância Diária</Text>
            <Text style={[styles.heroSubtitle, compact && styles.heroSubtitleCompact]}>
              Saltos Finos, Atitude Marcante.
            </Text>
            <PrimaryButton
              label="Descubra a Coleção"
              onPress={() => navigation.navigate("Catalog")}
            />
          </View>
        </LinearGradient>
      </ImageBackground>

      <View style={[styles.benefitsBar, { paddingHorizontal: pagePadding }]}>
        {benefitsBar.map((item) => (
          <View key={item.title} style={styles.benefitCard}>
            <Image source={item.icon} style={styles.benefitIcon} />
            <Text style={styles.benefitTitle}>{item.title}</Text>
            <Text style={styles.benefitSubtitle}>{item.subtitle}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { paddingHorizontal: pagePadding }]}>
        <View style={styles.featuredHeader}>
          <Text style={styles.featuredHeaderTitle}>Coleção em Destaque</Text>
          <Text style={styles.featuredHeaderSubtitle}>Descubra as peças mais desejadas da temporada</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id_produto}
              product={product}
              variant="featured"
              onPress={() => stackNavigation.navigate("Product", { productId: product.id_produto })}
            />
          ))}
        </ScrollView>
        <PrimaryButton
          label="Ver Catálogo Completo"
          variant="secondary"
          onPress={() => navigation.navigate("Catalog")}
        />
      </View>

      <View style={[styles.section, styles.storySection, { paddingHorizontal: pagePadding }]}>
        <View style={styles.storyImageWrap}>
          <Image source={imageAssets.aboutUs} style={styles.storyImage} resizeMode="cover" />
        </View>
        <View style={styles.storyCopy}>
          <Text style={styles.storyLabel}>Nossa História</Text>
          <Text style={styles.storyTitle}>Fatal Lady</Text>
          <Text style={styles.storyParagraph}>
            Nascemos com o propósito de empoderar mulheres através da moda.
            Cada par de sapatos é cuidadosamente desenhado para unir elegância,
            conforto e modernidade.
          </Text>
          <Text style={styles.storyParagraph}>
            Nossa missão é proporcionar confiança e estilo com produtos de alta
            qualidade e design inovador, para que você brilhe em qualquer ocasião.
          </Text>
          <View style={styles.statsRow}>
            {stats.map((item) => (
              <View key={item.label} style={styles.statCard}>
                <Text style={styles.statValue}>{item.value}</Text>
                <Text style={styles.statLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={[styles.section, { paddingHorizontal: pagePadding }]}>
        <SectionHeader
          title="Explore por Categoria"
          subtitle="Encontre o estilo perfeito para cada momento"
        />
        <View style={styles.categoryGrid}>
          {categories.map((category) => (
            <Pressable
              key={category.id}
              style={styles.categoryCard}
              onPress={() => navigation.navigate("Catalog")}
            >
              <View style={styles.categoryImageWrap}>
                <Image source={category.icon} style={styles.categoryImage} resizeMode="contain" />
              </View>
              <Text style={styles.categoryTitle}>{category.nome}</Text>
              <Text style={styles.categoryCount}>{category.countLabel}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={[styles.section, { paddingHorizontal: pagePadding }]}>
        <SectionHeader title="Nossas Coleções" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.bannerList}>
          {collectionBanners.map((banner, index) => (
            <Image key={`banner-${index}`} source={banner} style={styles.bannerImage} resizeMode="cover" />
          ))}
        </ScrollView>
      </View>

      <View style={[styles.section, { paddingHorizontal: pagePadding }]}>
        <SectionHeader title="O que Nossas Clientes Dizem" />
        <View style={styles.testimonialGrid}>
          {testimonials.map((item) => (
            <View key={item.author} style={styles.testimonialCard}>
              <Text style={styles.stars}>★★★★★</Text>
              <Text style={styles.testimonialText}>{item.text}</Text>
              <Text style={styles.testimonialAuthor}>{item.author}</Text>
              <Text style={styles.testimonialCity}>{item.city}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { paddingHorizontal: pagePadding }]}>
        <SectionHeader
          title="Guia de Tamanhos"
          subtitle="Encontre o tamanho perfeito para você"
        />
        <View style={styles.tableCard}>
          <View style={styles.tableHeader}>
            {["BR", "US", "EU", "CM"].map((item) => (
              <Text key={item} style={styles.tableHeaderText}>{item}</Text>
            ))}
          </View>
          {sizeGuideRows.map((row) => (
            <View key={row.join("-")} style={styles.tableRow}>
              {row.map((item) => (
                <Text key={item} style={styles.tableCell}>{item}</Text>
              ))}
            </View>
          ))}
        </View>
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>Como Medir Seu Pé</Text>
          <Text style={styles.storyParagraph}>
            Para garantir o ajuste perfeito, siga estas instruções simples para medir seu pé corretamente.
          </Text>
          {sizeGuideTips.map((tip) => (
            <View key={tip} style={styles.tipItem}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { paddingHorizontal: pagePadding }]}>
        <SectionHeader
          title="Dúvidas Frequentes"
          subtitle="Tire suas principais dúvidas antes de comprar"
        />
        <View style={styles.faqList}>
          {faqItems.map((item, index) => {
            const opened = openFaq === index;
            return (
              <Pressable
                key={item.question}
                style={styles.faqCard}
                onPress={() => setOpenFaq(opened ? null : index)}
              >
                <View style={styles.faqRow}>
                  <Text style={styles.faqQuestion}>{item.question}</Text>
                  <Image source={iconAssets.faqArrow} style={styles.faqArrow} />
                </View>
                {opened ? <Text style={styles.faqAnswer}>{item.answer}</Text> : null}
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={[styles.newsletterSection, { paddingHorizontal: pagePadding }]}>
        <View style={styles.newsletterHeader}>
          <Text style={styles.newsletterSectionTitle}>Benefícios Exclusivos</Text>
          <Text style={styles.newsletterSectionSubtitle}>Cadastre-se e aproveite vantagens especiais</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
          {newsletterBenefits.map((item) => (
            <View key={item.title} style={styles.newsletterCard}>
              <Text style={styles.newsletterBadge}>{item.badge}</Text>
              <Text style={styles.newsletterTitle}>{item.title}</Text>
              <Text style={styles.newsletterText}>{item.text}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <AppFooter />
    </ScrollView>
  );
}

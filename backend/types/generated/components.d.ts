import type { Schema, Struct } from '@strapi/strapi';

export interface NavigationAuthNavigation extends Struct.ComponentSchema {
  collectionName: 'components_navigation_auth_navigations';
  info: {
    displayName: 'AuthNavigation';
  };
  attributes: {
    buttonLogo: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    buttonRoute: Schema.Attribute.String & Schema.Attribute.Required;
    buttonText: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface NavigationNavigation extends Struct.ComponentSchema {
  collectionName: 'components_navigation_navigations';
  info: {
    displayName: 'Navigation';
    icon: 'bulletList';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    route: Schema.Attribute.String & Schema.Attribute.Unique;
  };
}

export interface SectionsFooter extends Struct.ComponentSchema {
  collectionName: 'components_sections_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    footerText: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_hero_sections';
  info: {
    displayName: 'HeroSection';
  };
  attributes: {
    ctaLink: Schema.Attribute.String & Schema.Attribute.Required;
    ctaText: Schema.Attribute.String & Schema.Attribute.Required;
    heroImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    subtitle: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'navigation.auth-navigation': NavigationAuthNavigation;
      'navigation.navigation': NavigationNavigation;
      'sections.footer': SectionsFooter;
      'sections.hero-section': SectionsHeroSection;
    }
  }
}

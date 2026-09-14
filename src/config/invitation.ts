export interface TimelineItem {
  time: string;
  title: string;
  description?: string;
  icon?: string;
}

export interface InvitationConfig {
  brideName: string;
  groomName: string;
  monogram: string;
  weddingDateFormatted: string;
  weddingDateISO: string; // Used for countdown
  heroSubtitle: string;
  
  // Calligraphy & Poetic texts
  bismillahText: string;
  poeticQuote: string;
  invitationText: string;
  
  // Venue
  venue: {
    name: string;
    subName: string;
    address: string;
    city: string;
    mapUrl: string;
    mapEmbedUrl: string;
    illustrationPath: string;
  };
  
  // Program Timeline
  timeline: TimelineItem[];
  
  // Extra Details
  dressCode: {
    title: string;
    style: string;
    description: string;
    palette: { name: string; hex: string }[];
  };
  
  giftPreference: {
    title: string;
    description: string;
    subNote: string;
  };
  
  closing: {
    quote: string;
    signature: string;
    photoPath: string;
  };
  
  rsvp: {
    deadline: string;
    phoneContact: string;
    phoneFormatted: string;
  };
  
  assets: {
    paperTexture: string;
    heroGarden: string;
    floralTop: string;
    floralBottom: string;
    venue: string;
    couple: string;
    music: string;
  };
}

export const invitationConfig: InvitationConfig = {
  brideName: 'Nigar',
  groomName: 'Ali',
  monogram: 'N & A',
  weddingDateFormatted: '20.09.2027',
  weddingDateISO: '2027-09-20T17:00:00+04:00',
  heroSubtitle: 'Toy günü',
  
  bismillahText: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
  poeticQuote: 'İki ürək, bir tale, Allahın yazdığı bir ömür',
  invitationText:
    'Əziz və hörmətli qonağımız! Həyatımızın ən xoşbəxt və unudulmaz günündə, birgə addımlayacağımız bu müqəddəs ömür yolunun başlanğıcında — toy mərasimimizdə sizi də aramızda görməkdən sonsuz şərəf və sevinc hissi duyardıq.',
  
  venue: {
    name: 'Böyük Saray Şadlıq Sarayı',
    subName: 'Büllur Zalı (Grand Ballroom)',
    address: 'Heydər Əliyev prospekti 182',
    city: 'Bakı, Azərbaycan',
    mapUrl: 'https://maps.google.com/?q=Baku+Heydar+Aliyev+Avenue',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.568435133649!2d49.8671!3d40.4093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDI0JzMzLjUiTiA0OcKwNTInMDEuNiJF!5e0!3m2!1sen!2saz!4v1620000000000!5m2!1sen!2saz',
    illustrationPath: '/invitation/venue.webp',
  },
  
  timeline: [
    {
      time: '17:00',
      title: 'Qonaqların qarşılanması',
      description: 'Zərif musiqi müşayiəti və foye qarşılama kokteyli',
    },
    {
      time: '18:00',
      title: 'Nikah mərasimi',
      description: 'Rəsmi andiçmə və nikah əqdi imzalanması',
    },
    {
      time: '19:00',
      title: 'Ziyafətin başlanması',
      description: 'Gəlin və bəyin zala təntənəli daxil olması',
    },
    {
      time: '20:00',
      title: 'Şam yeməyi',
      description: 'Milli və Avropa mətbəxinin xüsusi təamları',
    },
    {
      time: '21:00',
      title: 'Rəqs və əyləncə',
      description: 'İlk rəqs, tort kəsimi və canlı ifalar',
    },
  ],
  
  dressCode: {
    title: 'Dress-Code',
    style: 'Black Tie / Formal Elegance',
    description:
      'Gecəmizin gözəlliyinə ahəng qatmaq üçün qonaqlarımızdan zərif formal geyimlər və ahəngdar pastel tonlar rica edirik. Ağ rəngin yalnız gəlin üçün ayrılmasını xahiş edirik.',
    palette: [
      { name: 'Tünd Bordo', hex: '#7A1830' },
      { name: 'Antik Qızılı', hex: '#B99245' },
      { name: 'Krem', hex: '#FAF4E6' },
      { name: 'Zərif Taupe', hex: '#75665F' },
      { name: 'Dərin Qara', hex: '#2A2523' },
    ],
  },
  
  giftPreference: {
    title: 'Hədiyyə seçimi',
    description:
      'Bizim üçün ən böyük hədiyyə sizin sevgi dolu təbəssümünüz və varlığınızdır. Əgər yeni qurulacaq ailə büdcəmizə töhfə vermək istəsəniz, zərf şəklində hədiyyənizi məmnuniyyətlə qəbul edərik.',
    subNote: 'Səmimi sevginiz və dualarınız hər şeydən qiymətlidir.',
  },
  
  closing: {
    quote: 'Sevgi səbirdir, sevgi şəfqətdir. Sevgi heç vaxt tükənməyən bir nağıldır...',
    signature: 'Sizi aramızda görmək arzusu ilə,\nNigar & Ali',
    photoPath: '/invitation/couple.webp',
  },
  
  rsvp: {
    deadline: '01.09.2027',
    phoneContact: '+994501234567',
    phoneFormatted: '+994 (50) 123-45-67',
  },
  
  assets: {
    paperTexture: '/invitation/paper-texture.webp',
    heroGarden: '/invitation/hero-garden.webp',
    floralTop: '/invitation/floral-top.webp',
    floralBottom: '/invitation/floral-bottom.webp',
    venue: '/invitation/venue.webp',
    couple: '/invitation/couple.webp',
    music: '/invitation/music.mp3',
  },
};

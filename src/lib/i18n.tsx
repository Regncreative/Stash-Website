'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export type Lang = 'en' | 'tr'

const en = {
  nav: {
    demo: 'Demo',
    features: 'Features',
    why: 'Why Stash',
    download: 'Download',
    faq: 'FAQ',
    downloadBtn: 'Download',
  },
  install: {
    open: 'Installation help',
    close: 'Close',
    title: 'Installing Stash on Windows',
    intro:
      'Stash is distributed as a Windows installer (`.exe`) from GitHub Releases. Windows may show a SmartScreen prompt on first run — that’s expected for apps outside the Microsoft Store.',
    steps: [
      'Download the latest **Stash Setup** `.exe` from the release page.',
      'Open the downloaded `.exe` file.',
      'If **Windows protected your PC** appears, click **More info**, then **Run anyway**.',
      'Follow the installer, then launch Stash from the Start menu.',
      'Stash lives in the system tray — look for the Stash icon near the clock, or press `Ctrl+Shift+Space`.',
    ],
    blockedTitle: 'Still blocked?',
    blockedBody:
      'Open **Windows Security** → **App & browser control** → **Reputation-based protection settings**, and allow the installer. You can also right-click the `.exe` → **Properties** → check **Unblock** → **OK**, then run it again.',
    whyTitle: 'Why does this happen?',
    whyBody:
      'Windows SmartScreen warns about apps that are new or not widely signed through the Store. Stash is open source on GitHub — you can review the code and download the official build from Releases before you install.',
    source: 'Source code',
    release: 'Release page',
  },
  hero: {
    tagline:
      'A modern file shelf for Windows. Park files in the tray, drag them back when you need them — references only, no clutter.',
    downloadBtn: 'Download for Windows',
    githubBtn: 'View on GitHub',
    shortcutPrefix: 'Open anytime with',
  },
  productHunt: {
    live: 'Coming soon',
    title: 'Stash is launching on Product Hunt',
    subtitle: 'follow along and be ready to upvote',
  },
  productDemo: {
    eyebrow: 'Product demo',
    title: 'Feels like a built-in Windows feature',
    description: 'A desktop workflow on top — then panel, appearance, and settings looping below.',
    desktopTitle: 'Desktop workflow',
    desktopDesc: 'Drop a file into Stash from the desktop, then drag it into Mail as an attachment.',
    panelTitle: 'Panel',
    panelDesc: 'Search, missing-file awareness, and remove from shelf.',
    appearanceTitle: 'Appearance',
    appearanceDesc: 'Language, theme, accent, and idle behavior.',
    settingsTitle: 'Settings',
    settingsDesc: 'Sort, hotkey, shelves, and updates.',
  },
  features: {
    eyebrow: 'Features',
    title: 'Everything you need. Nothing you don’t.',
    description:
      'Built as a lightweight productivity tool — focused on temporary files, not another cloud drive.',
    items: [
      {
        title: 'System Tray',
        description: 'Lives quietly in the tray — one click or shortcut away, never in the way.',
      },
      {
        title: 'Drag & Drop',
        description: 'Drop files onto shelves, then drag them into Explorer, browsers, or any app.',
      },
      {
        title: 'Multiple Shelves',
        description: 'Organize by context: Work, Personal, Temporary — each with its own accent.',
      },
      {
        title: 'Search',
        description: 'Find files instantly by name, type, or shelf without opening Explorer.',
      },
      {
        title: 'Themes',
        description:
          'Fluent light and dark themes with accent colors that feel native to Windows 11.',
      },
      {
        title: 'Auto Launch',
        description: 'Start with Windows so your shelf is ready the moment you sign in.',
      },
      {
        title: 'Auto Update',
        description: 'Updates arrive from GitHub Releases — stay current without hunting installers.',
      },
      {
        title: 'SQLite',
        description: 'Fast local metadata only. Your files stay on disk; nothing is uploaded.',
      },
      {
        title: 'Localization',
        description: 'Full Turkish and English UI, including tray menus and system messaging.',
      },
    ],
  },
  why: {
    eyebrow: 'Why Stash',
    title: 'Stop parking files on the desktop',
    description:
      'Windows never gave you a proper temporary shelf. Stash does — without moving or uploading a byte.',
    withoutTitle: 'Without Stash',
    withoutItems: [
      'Desktop clutter',
      'Downloads folder chaos',
      'Constant Explorer switching',
      'Lost temporary files',
    ],
    withTitle: 'With Stash',
    withItems: ['Clean desktop', 'Organized shelves', 'Instant tray access', 'A clearer workflow'],
  },
  screens: {
    eyebrow: 'Interface',
    title: 'The real Stash panel — light and dark',
    description: 'Fluent surfaces, shelf pills, and file cards that match the installed app.',
  },
  download: {
    eyebrow: 'Download',
    title: 'Get Stash for Windows',
    description: 'Installer from GitHub Releases. No account, no telemetry cloud, no file uploads.',
    latestVersion: 'Latest version',
    win10Badge: 'Windows 10 compatible',
    downloadBtn: 'Download Stash',
    releasesBtn: 'GitHub Releases',
    sourcePrefix: 'Prefer source? Clone from',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Straight answers',
    description: 'The short version: local references, no uploads, open source.',
    items: [
      {
        q: 'Does Stash move my files?',
        a: 'No. Stash stores references (paths) only. Your files stay exactly where they are on disk.',
      },
      {
        q: 'Does it upload files?',
        a: 'No. There is no cloud sync and no account. Metadata stays local in SQLite on your machine.',
      },
      {
        q: 'Does it require an account?',
        a: 'No account, no sign-in. Install, launch from the tray, and start dropping files.',
      },
      {
        q: 'Is it open source?',
        a: 'Yes. Stash is MIT-licensed and developed in the open on GitHub.',
      },
      {
        q: 'Does it support Windows 10?',
        a: 'Yes. Stash targets Windows 11 aesthetics and is compatible with Windows 10 (x64).',
      },
    ],
  },
  footer: {
    github: 'GitHub',
    releases: 'Releases',
    license: 'License',
  },
  floating: {
    hint: 'Try Stash — search, pin, delete',
    subtitle: 'files · try search, pin, delete',
    settingsSubtitle: 'Settings',
    searchPlaceholder: 'Search files…',
    noMatch: 'No matching files',
    dropIdle: 'Drop a file or click to add',
    dropActive: 'Release to stash',
    note: 'Interactive demo — files stay in this browser tab only',
    backToShelf: 'Back to shelf',
    appearance: 'Appearance',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    accent: 'Accent color',
    behavior: 'Behavior',
    notifications: 'Notifications',
    notificationsDesc: 'Alerts for added files',
    hotkeyLabel: 'Panel hotkey',
    settingsNote: 'Settings apply instantly to this demo',
    added: 'Added',
    removed: 'Removed',
  },
}

export type Dict = typeof en

const tr: Dict = {
  nav: {
    demo: 'Demo',
    features: 'Özellikler',
    why: 'Neden Stash',
    download: 'İndir',
    faq: 'SSS',
    downloadBtn: 'İndir',
  },
  install: {
    open: 'Kurulum yardımı',
    close: 'Kapat',
    title: 'Stash’i Windows’a kurma',
    intro:
      'Stash, GitHub Releases üzerinden Windows kurulum dosyası (`.exe`) olarak dağıtılır. İlk çalıştırmada Windows SmartScreen uyarısı gösterebilir — Microsoft Store dışındaki uygulamalar için bu beklenen bir durumdur.',
    steps: [
      'Sürüm sayfasından en son **Stash Setup** `.exe` dosyasını indirin.',
      'İndirdiğiniz `.exe` dosyasını açın.',
      '**Windows PC’nizi korudu** uyarısı çıkarsa **Ek bilgi**ye, ardından **Yine de çalıştır**a tıklayın.',
      'Kurulum sihirbazını tamamlayın ve Stash’i Başlat menüsünden açın.',
      'Stash sistem tepsisinde yaşar — saat yanındaki Stash simgesine bakın veya `Ctrl+Shift+Space` kullanın.',
    ],
    blockedTitle: 'Hâlâ engelleniyor mu?',
    blockedBody:
      '**Windows Güvenliği** → **Uygulama ve tarayıcı denetimi** → **İtibar tabanlı koruma ayarları** yolunu açıp yükleyiciye izin verin. Ayrıca `.exe` dosyasına sağ tıklayıp **Özellikler** → **Engellemeyi kaldır** → **Tamam** deyip yeniden çalıştırabilirsiniz.',
    whyTitle: 'Bu neden olur?',
    whyBody:
      'Windows SmartScreen, Store dışında yeni veya az bilinen uygulamalar için uyarı verir. Stash GitHub’da açık kaynaklıdır — kurmadan önce kodu inceleyebilir ve resmi derlemeyi Releases’ten indirebilirsiniz.',
    source: 'Kaynak kod',
    release: 'Sürüm sayfası',
  },
  hero: {
    tagline:
      'Windows için modern bir dosya rafı. Dosyaları tepside bekletin, gerektiğinde geri sürükleyin — yalnızca referanslar, dağınıklık yok.',
    downloadBtn: 'Windows için indir',
    githubBtn: 'GitHub’da görüntüle',
    shortcutPrefix: 'İstediğiniz an açın:',
  },
  productHunt: {
    live: 'Yakında',
    title: 'Stash yakında Product Hunt’ta',
    subtitle: 'takipte kal, upvote için hazır ol',
  },
  productDemo: {
    eyebrow: 'Ürün demosu',
    title: 'Windows’un yerleşik bir özelliği gibi',
    description: 'Üstte masaüstü iş akışı — altta panel, görünüm ve ayarlar döngüsü.',
    desktopTitle: 'Masaüstü iş akışı',
    desktopDesc: 'Masaüstünden Stash’e bir dosya bırakın, sonra Mail’e ek olarak sürükleyin.',
    panelTitle: 'Panel',
    panelDesc: 'Arama, eksik dosya farkındalığı ve raftan silme.',
    appearanceTitle: 'Görünüm',
    appearanceDesc: 'Dil, tema, vurgu rengi ve boşta davranışı.',
    settingsTitle: 'Ayarlar',
    settingsDesc: 'Sıralama, kısayol, raflar ve güncellemeler.',
  },
  features: {
    eyebrow: 'Özellikler',
    title: 'İhtiyacınız olan her şey. Fazlası değil.',
    description:
      'Hafif bir üretkenlik aracı olarak tasarlandı — başka bir bulut sürücüsü değil, geçici dosyalara odaklı.',
    items: [
      {
        title: 'Sistem Tepsisi',
        description: 'Tepside sessizce yaşar — bir tık veya kısayol uzağınızda, asla yolunuza çıkmaz.',
      },
      {
        title: 'Sürükle & Bırak',
        description:
          'Dosyaları raflara bırakın; Explorer’a, tarayıcılara veya herhangi bir uygulamaya sürükleyin.',
      },
      {
        title: 'Çoklu Raflar',
        description: 'Bağlama göre düzenleyin: İş, Kişisel, Geçici — her biri kendi vurgu rengiyle.',
      },
      {
        title: 'Arama',
        description: 'Explorer’ı açmadan ada, türe veya rafa göre dosyaları anında bulun.',
      },
      {
        title: 'Temalar',
        description: 'Windows 11’e özgü hissettiren vurgu renkleriyle Fluent açık ve koyu temalar.',
      },
      {
        title: 'Otomatik Başlatma',
        description: 'Windows ile başlar; oturum açtığınız anda rafınız hazır.',
      },
      {
        title: 'Otomatik Güncelleme',
        description:
          'Güncellemeler GitHub Releases’ten gelir — kurulum dosyası aramadan güncel kalın.',
      },
      {
        title: 'SQLite',
        description: 'Yalnızca hızlı yerel meta veriler. Dosyalarınız diskte kalır; hiçbir şey yüklenmez.',
      },
      {
        title: 'Yerelleştirme',
        description: 'Tepsi menüleri ve sistem mesajları dahil tam Türkçe ve İngilizce arayüz.',
      },
    ],
  },
  why: {
    eyebrow: 'Neden Stash',
    title: 'Dosyaları masaüstüne park etmeyi bırakın',
    description:
      'Windows size hiçbir zaman düzgün bir geçici raf vermedi. Stash verir — tek bir baytı bile taşımadan veya yüklemeden.',
    withoutTitle: 'Stash olmadan',
    withoutItems: [
      'Masaüstü dağınıklığı',
      'İndirilenler klasörü kaosu',
      'Sürekli Explorer arasında geçiş',
      'Kaybolan geçici dosyalar',
    ],
    withTitle: 'Stash ile',
    withItems: ['Temiz masaüstü', 'Düzenli raflar', 'Anında tepsi erişimi', 'Daha net bir iş akışı'],
  },
  screens: {
    eyebrow: 'Arayüz',
    title: 'Gerçek Stash paneli — açık ve koyu',
    description: 'Yüklü uygulamayla birebir eşleşen Fluent yüzeyler, raf etiketleri ve dosya kartları.',
  },
  download: {
    eyebrow: 'İndir',
    title: 'Stash’i Windows için edinin',
    description: 'GitHub Releases’ten kurulum. Hesap yok, telemetri bulutu yok, dosya yükleme yok.',
    latestVersion: 'En son sürüm',
    win10Badge: 'Windows 10 uyumlu',
    downloadBtn: 'Stash’i indir',
    releasesBtn: 'GitHub Releases',
    sourcePrefix: 'Kaynak mı tercih edersiniz? Şuradan klonlayın:',
  },
  faq: {
    eyebrow: 'SSS',
    title: 'Net cevaplar',
    description: 'Kısaca: yerel referanslar, yükleme yok, açık kaynak.',
    items: [
      {
        q: 'Stash dosyalarımı taşır mı?',
        a: 'Hayır. Stash yalnızca referansları (yolları) saklar. Dosyalarınız diskte tam olarak oldukları yerde kalır.',
      },
      {
        q: 'Dosyaları yüklüyor mu?',
        a: 'Hayır. Bulut senkronizasyonu ve hesap yok. Meta veriler makinenizde SQLite içinde yerel kalır.',
      },
      {
        q: 'Hesap gerektiriyor mu?',
        a: 'Hesap yok, oturum açma yok. Kurun, tepsiden başlatın ve dosya bırakmaya başlayın.',
      },
      {
        q: 'Açık kaynak mı?',
        a: 'Evet. Stash MIT lisanslıdır ve GitHub’da açık olarak geliştirilir.',
      },
      {
        q: 'Windows 10’u destekliyor mu?',
        a: 'Evet. Stash, Windows 11 estetiğini hedefler ve Windows 10 (x64) ile uyumludur.',
      },
    ],
  },
  footer: {
    github: 'GitHub',
    releases: 'Sürümler',
    license: 'Lisans',
  },
  floating: {
    hint: 'Stash’i dene — ara, sabitle, sil',
    subtitle: 'dosya · ara, sabitle, sil',
    settingsSubtitle: 'Ayarlar',
    searchPlaceholder: 'Dosya ara…',
    noMatch: 'Eşleşen dosya yok',
    dropIdle: 'Dosya bırakın veya tıklayıp ekleyin',
    dropActive: 'Bırakın, rafa eklensin',
    note: 'Etkileşimli demo — dosyalar yalnızca bu sekmede kalır',
    backToShelf: 'Rafa dön',
    appearance: 'Görünüm',
    theme: 'Tema',
    light: 'Açık',
    dark: 'Koyu',
    accent: 'Vurgu rengi',
    behavior: 'Davranış',
    notifications: 'Bildirimler',
    notificationsDesc: 'Eklenen dosyalar için uyarılar',
    hotkeyLabel: 'Panel kısayolu',
    settingsNote: 'Ayarlar bu demoya anında uygulanır',
    added: 'Eklendi:',
    removed: 'Kaldırıldı:',
  },
}

export const COPY: Record<Lang, Dict> = { en, tr }

const STORAGE_KEY = 'stash-lang'

type LangContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Dict
}

const LangContext = createContext<LangContextValue>({
  lang: 'en',
  setLang: () => undefined,
  t: en,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'tr' || saved === 'en') {
      setLang(saved)
    }
    // Default remains English for first-time visitors
  }, [])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang, t: COPY[lang] }}>{children}</LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}

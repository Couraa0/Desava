import { useState, useEffect } from 'react';
import { toast } from 'sonner';

// Extend window interface for beforeinstallprompt event
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export function usePwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent) || 
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    setIsIOS(isIosDevice);

    // Detect Standalone Mode (installed)
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as any).standalone;
    setIsStandalone(!!isStandaloneMode);

    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const install = async () => {
    if (isStandalone) {
      toast.info("Aplikasi Sudah Terpasang", {
        description: "Aplikasi ini sudah berjalan dalam mode PWA di Layar Utama."
      });
      return;
    }

    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to install: ${outcome}`);
      setDeferredPrompt(null);
    } else if (isIOS) {
      toast.info("Cara Install di iOS / Safari:", {
        description: "1. Klik tombol Bagikan (Share) di Safari (ikon kotak dengan panah atas).\n2. Scroll ke bawah, pilih 'Tambahkan ke Layar Utama' (Add to Home Screen).\n3. Klik 'Tambah' di sudut kanan atas.",
        duration: 8000,
      });
    } else {
      toast.error("Instalasi Mandiri Tidak Didukung", {
        description: "Silakan buka menu browser Anda lalu pilih 'Tambahkan ke Layar Utama' atau 'Install Aplikasi' secara manual."
      });
    }
  };

  return { 
    install, 
    canInstall: (!!deferredPrompt || isIOS) && !isStandalone,
    isIOS, 
    isStandalone 
  };
}

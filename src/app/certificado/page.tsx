"use client";

import { useEffect, useState } from "react";
import Home from "@/app/page";
import CertificateModal from "@/components/ui/CertificateModal";

export default function CertificadoPage() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Home />
      <CertificateModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

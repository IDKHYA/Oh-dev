const code = `
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Globe, Monitor, Server, Smartphone, Cpu, Activity, 
  ShieldCheck, Cloud, Users, Zap, Wifi, Lock, ChevronRight, ChevronLeft,
  ArrowRight, ArrowLeftRight, CheckCircle2, Layout, Network, HardDrive
} from 'lucide-react';

export default function CiscoModule1Book() {
  const [currentPage, setCurrentPage] = useState(0);
  return <div>Test</div>;
}
`;

function transformCode(c) {
    if (!c) return '';
    let cleaned = c.replace(/import\s+[\s\S]*?from\s+['"].*?['"];?/g, '');
    const exportMatch = cleaned.match(/export\s+default\s+(?:function\s+)?(\w+)/);
    if (exportMatch) {
        const componentName = exportMatch[1];
        cleaned = cleaned.replace(/export\s+default\s+/g, '');
        return `
${cleaned}
() => <${componentName} />
        `;
    } else {
        return cleaned.replace(/export\s+default/g, '');
    }
}

console.log("--- TRANSFORMED CODE ---");
console.log(transformCode(code));

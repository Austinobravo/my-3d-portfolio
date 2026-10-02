'use client';

import { useState } from 'react';
import { useScrollLock } from '../_hooks/useScrollLock';

export default function MobileDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  // Automatically pauses Lenis when isOpen = true, resumes when isOpen = false
  useScrollLock(isOpen);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium"
      >
        Open Menu
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          {/* Drawer Content */}
          <div className="w-80 h-full bg-neutral-900 border-l border-neutral-800 p-6 text-white flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold">Navigation</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-neutral-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Scrollable list inside drawer (if menu items overflow) */}
              <div
                data-lenis-prevent
                className="space-y-4 max-h-[70vh] overflow-y-auto"
              >
                <a href="#" className="block py-2 text-lg border-b border-neutral-800">Home</a>
                <a href="#" className="block py-2 text-lg border-b border-neutral-800">Projects</a>
                <a href="#" className="block py-2 text-lg border-b border-neutral-800">About</a>
                <a href="#" className="block py-2 text-lg border-b border-neutral-800">Contact</a>
              </div>
            </div>

            <p className="text-xs text-neutral-500 font-mono">Lenis Scroll Paused</p>
          </div>
        </div>
      )}
    </>
  );
}
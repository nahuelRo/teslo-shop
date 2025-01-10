"use client";

import { useUisStore } from "@/store";

export const ButtonMenu = () => {
  const openMenu = useUisStore((state) => state.openSideMenu);

  return (
    <button
      onClick={openMenu}
      className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
    >
      Menú
    </button>
  );
};

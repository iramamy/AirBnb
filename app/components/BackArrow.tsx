"use client";

import { BiLeftArrowAlt } from "react-icons/bi";
import { useRouter } from "next/navigation";

const BackArrow = () => {
  const router = useRouter();
  return (
    <>
      <BiLeftArrowAlt
        size={35}
        cursor={`pointer`}
        onClick={() => router.back()}
      />
    </>
  );
};

export default BackArrow;

import ClientOnly from "@/components/ClientOnly";
import AllBooks from "@/components/AllBooks";

export default function Home() {
  return (
    <>
      <ClientOnly>
          <AllBooks />
      </ClientOnly>
    </>
  );
}

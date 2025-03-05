import ClientOnly from "@/components/ClientOnly";
import AllBooks from "@/components/AllBooks";

export default function Home() {
  return (
    <div style={{padding: "25px"}}>
      <ClientOnly>
          <AllBooks />
      </ClientOnly>
    </div>
  );
}

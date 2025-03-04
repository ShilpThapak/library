import ClientOnly from "@/components/ClientOnly";
import Books from "@/components/AllBooks";

export default function Home() {
  return (
    <div style={{padding: "25px"}}>
      <ClientOnly>
          <Books />
      </ClientOnly>
    </div>
  );
}

import ClientOnly from "@/components/ClientOnly";
import BooksGrid from "@/components/AllBooks";

export default function Authors() {
  return (
    <div style={{padding: "25px"}}>
      <ClientOnly>
          <BooksGrid />
      </ClientOnly>
    </div>
  );
}

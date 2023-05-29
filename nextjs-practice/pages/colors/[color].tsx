import { useRouter } from "next/router";

export default function Color({
  colorData,
}: {
  colorData: { id: number; color: string; primary: boolean };
}) {
  const router = useRouter();
  const { color } = router.query;

  return (
    <div style={{ backgroundColor: colorData.color, padding: "20px" }}>
      <h1>You have chosen the color {color}</h1>
      <h2>ID: {colorData.id}</h2>
      <h2>Primary? {colorData.primary.toString()}</h2>
    </div>
  );
}

/* --- getServerSideProps will fetch data at every request
  Server Side Rendering (SSR)
  SSR pros: Ideal when data is changing constantly, end user will always have the latest data
  SSR cons: Slower, inefficient data caching. Need to have a server to handle all requests
    vs. caching everything on a global CDN (content delivery network)
  Use case example: Ebay
*/
export async function getServerSideProps({
  params,
}: {
  params: { color: string };
}) {
  const request = await fetch(`http://localhost:3000/${params.color}.json`);
  const data = await request.json();

  return { props: { colorData: data } };
}

/* --- getStaticProps and getStaticPaths will fetch data at build time (prerendering)
  Static Site Generation (SSG)
  SSG Pros: End user gets content quicker, code can be crawled by search bots
  SSG Cons: Data may become stale, hard to scale many pages (prerender all pages at once can get slow)
  Use case example: A blog

  --- adding revalidate to the getStaticProps return will fetch data at build time
    and refresh every `revalidate` seconds - Incremental Statis Generation (ISR)
*/
// export async function getStaticProps({
//   params,
// }: {
//   params: { color: string };
// }) {
//   const request = await fetch(`http://localhost:3000/${params.color}.json`);
//   const data = await request.json();

//   return {
//     props: { colorData: data },
//     // revalidate: 30 // This would make the app refetch data every 30 seconds, making this ISR
//   };
// }

// export async function getStaticPaths() {
//   const request = await fetch("http://localhost:3000/colors.json");
//   const data = await request.json();

//   const paths = data.map((color: string) => {
//     return {
//       params: {
//         color: color,
//       },
//     };
//   });

//   return { paths, fallback: false };
// }

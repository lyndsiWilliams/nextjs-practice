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

/* --- getServerSideProps will fetch data at every request --- */
export async function getServerSideProps({
  params,
}: {
  params: { color: string };
}) {
  const request = await fetch(`http://localhost:3000/${params.color}.json`);
  const data = await request.json();

  return { props: { colorData: data } };
}

/* --- getStaticProps and getStaticPaths will fetch data at build time --- */
// export async function getStaticProps({
//   params,
// }: {
//   params: { color: string };
// }) {
//   const request = await fetch(`http://localhost:3000/${params.color}.json`);
//   const data = await request.json();

//   return { props: { colorData: data } };
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

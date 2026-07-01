import CreateArt from "./CreateArt";

export default async function Page({ searchParams }) {

  const params = await searchParams;

  return <CreateArt artid={params?.id || null} />;

}
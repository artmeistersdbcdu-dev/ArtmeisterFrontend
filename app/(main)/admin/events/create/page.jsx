import CreateEventPage from "./CreateEventPage";


export default async function Page({ searchParams }) {
  const params = await searchParams;

  return <CreateEventPage id={params?.id || null} />;
}
interface ServerIdPageProps {
  params: {
    serverId: string;
  };
}

export default async function Page({ params }: ServerIdPageProps) {
  return <div className="h-full">Server ID: {params.serverId}</div>;
}

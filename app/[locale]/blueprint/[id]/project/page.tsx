import BlueprintContentPage from '@/components/blueprints/BlueprintContentRendererSimple';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ id: string; locale: string }>;
};

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  console.log('[ProjectPage] Rendering with id:', id);
  return <BlueprintContentPage type="project" blueprintId={id} />;
}

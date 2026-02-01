import BlueprintContentPage from '@/components/blueprints/BlueprintContentRendererSimple';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ id: string; locale: string }>;
};

export default async function RequirementsPage({ params }: PageProps) {
  const { id } = await params;
  console.log('[RequirementsPage] Rendering with id:', id);
  return <BlueprintContentPage type="requirements" blueprintId={id} />;
}

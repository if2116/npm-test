import BlueprintContentPage from '@/components/blueprints/BlueprintContentRendererSimple';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ id: string; locale: string }>;
};

export default async function ValidationPage({ params }: PageProps) {
  const { id } = await params;
  console.log('[ValidationPage] Rendering with id:', id);
  return <BlueprintContentPage type="validation" blueprintId={id} />;
}

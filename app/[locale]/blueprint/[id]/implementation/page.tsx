import BlueprintContentPage from '@/components/blueprints/BlueprintContentRendererSimple';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ id: string; locale: string }>;
};

export default async function ImplementationPage({ params }: PageProps) {
  const { id } = await params;
  console.log('[ImplementationPage] Rendering with id:', id);
  return <BlueprintContentPage type="implementation" blueprintId={id} />;
}

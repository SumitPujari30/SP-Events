import { notFound } from 'next/navigation';
import { events } from '@/lib/galleryData';
import CaseStudyClient from '@/components/case/CaseStudyClient';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return events.map(e => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const event = events.find(e => e.slug === slug);
    return {
        title: event ? `${event.title} | SP Events Portfolio` : 'Event | SP Events',
    };
}

export default async function CaseStudyPage({ params }: Props) {
    const { slug } = await params;
    const event = events.find(e => e.slug === slug);
    if (!event) notFound();

    return <CaseStudyClient event={event} />;
}

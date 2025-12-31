import { MobileContainer } from '@/components/MobileContainer';
import { MinecraftClient } from './MinecraftClient';

export const metadata = { 
  title: 'マイクラSDGsコース | CLAFT',
  description: 'マイクラ×SDGs×プログラミングで、楽しみながら社会課題を自分ごと化。発想を形にし、論理思考と発信力を育むオンライン講座。'
};

export default function MinecraftPage() {
  return (
    <MobileContainer>
      <MinecraftClient />
      
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOccupationalProgram",
            "name": "マイクラSDGsコース",
            "description": "マイクラ×SDGs×プログラミングで、楽しみながら社会課題を自分ごと化。",
            "provider": { "@type": "Organization", "name": "CLAFT" },
            "offers": { "@type": "Offer", "price": "7700", "priceCurrency": "JPY" },
            "timeOfDay": "オンライン"
          })
        }}
      />
    </MobileContainer>
  );
}

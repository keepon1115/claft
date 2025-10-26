import Link from 'next/link';

const courses = [
  { title: 'Career', href: '/career', img: '/assets/images/cards/card_career.jpg' },
  { title: 'Futurecraft', href: '/futurecraft', img: '/assets/images/cards/card_futurecraft.jpg' },
  { title: 'Minecraft', href: '/minecraft', img: '/assets/images/cards/card_minecraft.jpg' },
  { title: 'Yononaka', href: '/yononaka', img: '/assets/images/cards/card_yononaka.jpg' },
];

export function CourseGrid(){
  return (
    <section className="py-6">
      <div className="container">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map(c => (
            <Link key={c.href} href={c.href} className="rounded-xl overflow-hidden bg-white shadow-soft">
              <div className="aspect-[16/9]">
                <img src={c.img} alt={c.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-3 font-bold">{c.title}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import DATABASE from '../../database/database.service';
import Image from 'next/image';

export default async function Rankings() {
  const rankings = await DATABASE.getRankings();
  const more = rankings.total - rankings.rankings.length

  function widthFromIndex(index: number) {
    switch (index) {
      case 0:
        return 'w-md';
      case 1:
        return 'w-sm';
      case 2:
        return 'w-xs';
      default:
        return 'w-2xs';
    }
  }

  function colorFromIndex(index: number) {
    switch (index) {
      case 0:
        return 'text-amber-300';
      case 1:
        return 'text-stone-300';
      case 2:
        return 'text-amber-600';
      default:
        return 'text-gray-400';
    }
  }

  return (<div className={'flex flex-col gap-7 w-full px-10 py-12 justify-center items-center'}>
    {rankings.rankings.map((avatar, index) => <div key={avatar.id} style={{ backgroundImage: `url(${avatar.image})`, boxShadow: 'inset 0 0 35px 5px black' }}
                                         className={`border border-gray-500 rounded-sm ${widthFromIndex(index)} aspect-3/4 bg-cover bg-no-repeat bg-center pointer-events-none relative`}>
      {index === 0 && <Image aria-hidden src="/crown.png" alt="Rankings" width={130} height={130} className={'pointer-events-none absolute -top-22 -left-14 -rotate-30'} />}
      <span style={{ textShadow: '0 0 6px black' }}
            className={`pointer-events-none absolute ${index > 2 ? 'text-2xl' : 'text-4xl'} ${colorFromIndex(index)} top-2 right-3`}>{index + 1}</span>
    </div>)}
    {more > 0 && <div className={'text-gray-400'}>and {more} more...</div>}
  </div>);
}

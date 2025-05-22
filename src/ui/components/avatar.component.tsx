import { AvatarDTO } from '../../model/database.model';

interface AvatarProps {
  avatar: AvatarDTO,
  onClick?: () => void,
}

export default function Avatar({ avatar, onClick }: AvatarProps) {

  return(<div style={{backgroundImage: `url(${avatar.image})`, boxShadow: 'inset 0 0 35px 5px black'}} onClick={onClick}
              className={'border border-gray-500 hover:border-blue-400 rounded-sm grow-1 w-full md:w-auto max-w-md md:max-w-lg aspect-3/4 bg-cover bg-no-repeat bg-center cursor-pointer saturate-95 hover:saturate-100 brightness-95 hover:brightness-100'}>
  </div>)
}
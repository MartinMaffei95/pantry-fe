import { FC } from 'react';
import { PiBowlFoodDuotone } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

type Props = {};
const Header: FC<Props> = ({}) => {
  const navigate = useNavigate();
  return (
    <header className="h-16 w-full bg-orange-500 text-green-800 flex justify-between items-center shadow-md">
      <div onClick={() => navigate('/')} className="px-4 py-2 gap-2 flex">
        <PiBowlFoodDuotone className=" text-3xl m-auto text-neutral-50" />
        <p className="font-bold tracking-widest flex flex-col items-center justify-center">
          <span>chef's</span>
          <span>selection</span>
        </p>
      </div>
    </header>
  );
};

export default Header;

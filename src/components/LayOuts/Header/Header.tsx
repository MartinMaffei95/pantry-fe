import { FC } from "react";
import { PiBowlFoodDuotone } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import LateralMenu from "../../LateralMenu/LateralMenu";
type Props = {};
const Header: FC<Props> = ({}) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <header className="h-16 w-full bg-orange-500 text-green-800 flex justify-between items-center shadow-md">
      <div onClick={() => navigate("/")} className="px-4 py-2 gap-2 flex w-full justify-between">
        {/* Logo */}
        <div className="px-4 py-2 gap-2 flex "> 
          <PiBowlFoodDuotone className=" text-3xl m-auto text-neutral-50" />
        <p className="font-bold tracking-widest flex flex-col items-center justify-center">
          <span>chef's</span>
          <span>selection</span>
        </p>
        </div>
        {/* LATERAL MENU BTN */}
        <div className="px-4 gap-2 flex items-center justify-center">   
          <Button colorScheme="blackAlpha" onClick={onOpen}>
            <AiOutlineMenu />
          </Button>
        </div>
       
     
      </div>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <LateralMenu onClose={onClose} />
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </header>
  );
};

export default Header;

import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { communityState } from "../atoms/communitiesAtom";
import {
  defaultMenuItem,
  DirectoryMenuItem,
  directoryMenuState,
} from "../atoms/directoryMenuAtom";
import {  FaUserAstronaut } from "react-icons/fa";

const useDirectory = () => {
  const [directoryState, setDirectoryState] =
    useRecoilState(directoryMenuState);
  const router = useRouter();
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);

  const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
    setDirectoryState((prev) => ({
      ...prev,
      selectedMenuItem: menuItem,
    }));
    router?.push(menuItem.link);
    if (directoryState.isOpen) {
      toggleMenuOpen();
    }
  };

  const toggleMenuOpen = () => {
    setDirectoryState((prev) => ({
      ...prev,
      isOpen: !directoryState.isOpen,
    }));
  };

//   
useEffect(() => {
  const { currentCommunity } = communityStateValue;

  if (currentCommunity) {
    setDirectoryState((prev) => ({
      ...prev,
      selectedMenuItem: {
        displayText: `q/${currentCommunity.id}`,
        link: `/q/${currentCommunity.id}`,
        imageURL: currentCommunity.imageURL,
        icon: FaUserAstronaut,
        iconColor: "blue.500",
      },
    }));
    return;
  }
  setDirectoryState((prev) => ({
    ...prev,
    selectedMenuItem: defaultMenuItem,
  }));
}, [communityStateValue.currentCommunity]);

useEffect(() => {
  const { communityId } = router.query;

  if (!communityId) {
    setCommunityStateValue((prev) => ({
      ...prev,
      currentCommunity: undefined,
    }));
  }
}, [router.query]);

return { directoryState, toggleMenuOpen, onSelectMenuItem };
};

export default useDirectory;
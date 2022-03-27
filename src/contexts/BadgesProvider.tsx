import React, { createContext, ReactNode, useState, useContext, useCallback } from 'react';
import io, { Socket } from 'socket.io-client';
import * as events from "events";

interface BadgesContextType {
  setNewBadges: (newBadges: any[]) => void,
  badges?: any[],
  addBadge: (newBadge: any) => void,
  findBadge: (badgeId: string) => any,
  deleteBadge: (badgeId: string) =>void,
}

let BadgesContext = createContext<BadgesContextType>(null!);

const BadgesProvider = ({ children }: { children: ReactNode }) => {
  const [badges, setBadges] = useState<any[]>([]);

  const setNewBadges = (newBadges: any[]) => {
    setBadges(newBadges);
  };

  const addBadge = (newBadge: any) => {
    setBadges(prevBadges => {
      const newBadges = prevBadges;
      if (!prevBadges.find(badge => badge._id === newBadge.id)) {
        newBadges.push(newBadge);
      }
      return newBadges
    });
  };

  const deleteBadge = (badgeId: string) => {
    setBadges(prevBadges => prevBadges.filter((badge: any) => badge._id !== badgeId));
  }

  const findBadge = useCallback(
      (badgeId: string) => {
        return badges?.find((badge: any) => badge._id === badgeId);
      },
      [badges],
  );

  let value = { setNewBadges, badges, addBadge, findBadge, deleteBadge };

  return <BadgesContext.Provider value={value}>{children}</BadgesContext.Provider>;
}

export const useBadges = () => {
  return useContext(BadgesContext);
}

export default BadgesProvider;

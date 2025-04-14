"use client"

import { useUser } from "@clerk/nextjs";

const Congratulations = () => {

      const { user, isLoaded } = useUser();
    
      if (!isLoaded) return null;
    
      const userName = user?.firstName || "Usuário";
    
      const congrat = () => {
        if (new Date().getHours() >= 0 && new Date().getHours() < 12) {
          return "Bom dia";
        } else if (new Date().getHours() >= 12 && new Date().getHours() < 18) {
          return "Boa tarde";
        } else {
          return "Boa noite";
        }
      }

      const today = new Date().toLocaleString('pt-BR', {
        day: "2-digit",
        month: "long",
        year: "numeric"
      })

    return ( 
        <p>{congrat()} {userName}, {today}.</p>
     );
}
 
export default Congratulations;
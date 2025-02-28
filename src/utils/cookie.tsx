
export const getCookie = (name: string): string | undefined => {
    if (typeof document !== "undefined") {
      const cookie = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
      return cookie ? cookie[2] : undefined;
    }
  };
  
  export const setCookie = (
    name: string,
    value: string,
    days: number = 0,
    hours: number = 0
  ): void => {
    let date = new Date();
    if (days || hours) {
      date.setTime(
        date.getTime() + hours * 60 * 60 * 1000 + 24 * 60 * 60 * 1000 * days
      );
      document.cookie =
        name + "=" + value + ";path=/;expires=" + date.toUTCString();
    } else {
      document.cookie = name + "=" + value + ";path=/";
    }
  };
    
  export const deleteCookie = (name: string): void => {
    setCookie(name, "", -1);
  };
  
  export const deleteAllCookie = (): void => {
    document.cookie.split(";").forEach((c) => {
      document.cookie =
        c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  };
  
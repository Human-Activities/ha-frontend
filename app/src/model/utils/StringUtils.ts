export class StringUtils {

    public static generateShortcutString(text: string) {
        if (text == null) return 'NA';
        const splitString = text.split(' ');
        switch(splitString.length) {
            case 1:
                return text.charAt(0).toUpperCase(); // Np. Dieta = D, Gierki = G itp.
            case 2:
            case 3:
            case 4:       // Maksymalnie do 4 znaków dla czytelności
                {
                    //Np. Dieta Cud = DC, Dieta cud = Dc, Fajne Hot Babki = FHB, Hot ostre lalunie = Hol itp.
                    let shortcut = splitString[0].charAt(0).toUpperCase();
                    for (let i = 1; i < splitString.length; i++) {
                        shortcut += splitString[1].charAt(0); 
                    }
                    return shortcut;
                }
            default:
                return text.substring(0, 4); //jak więcej to słów to defaultowo bierzemy po prostu 4 litery pierwszego słowa    
        }
    } 
}
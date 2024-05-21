import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function cedulaValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cedula = control.value;
    
    const isValidDNI = validateCedula(cedula);
console.log("Resutlado: " + isValidDNI)
    return isValidDNI ? null : { cedulaInvalida: true };
  };
}

function validateCedula(cedulaEnviada:string): boolean {      
    let cedulaCorrecta = false;
    let cedula = String(cedulaEnviada);
    if (String(cedula).length == 10)
    {    
        let tercerDigito = parseInt(cedula.substring(2, 3));
        if (tercerDigito < 6) {
            // El ultimo digito se lo considera dígito verificador
            let coefValCedula = [2, 1, 2, 1, 2, 1, 2, 1, 2];       
            let verificador = parseInt(cedula.substring(9, 10));
            let suma:number = 0;
            let digito:number = 0;
            for (let i = 0; i < (cedula.length - 1); i++) {
                digito = parseInt(cedula.substring(i, i + 1)) * coefValCedula[i];      
                suma += ((parseInt((digito % 10)+'') + (parseInt((digito / 10)+''))));
            }
            suma= Math.round(suma);
            if ((Math.round(suma % 10) == 0) && (Math.round(suma % 10)== verificador)) {
                cedulaCorrecta = true;
            } else if ((10 - (Math.round(suma % 10))) == verificador) {
                cedulaCorrecta = true;
            } else {
                cedulaCorrecta = false;
            }
        } else {
            cedulaCorrecta = false;
        }
    } else {
        cedulaCorrecta = false;
    }
    return cedulaCorrecta;
  }
function FormatarCnpjCpf(valor) {
  if (!valor) return "";
  const apenasNumeros = valor.replace(/\D/g, "");

  if (apenasNumeros.length === 11) {
    // Formato CPF: 000.000.000-00
    return apenasNumeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  } else if (apenasNumeros.length === 14) {
    // Formato CNPJ: 00.000.000/0000-00
    return apenasNumeros.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  } else {
    // Retorna o valor original se não for CPF nem CNPJ
    return valor;
  }
}

module.exports = { FormatarCnpjCpf };

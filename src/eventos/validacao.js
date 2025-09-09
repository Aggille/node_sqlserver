const Evento = require("../models/Evento");
const { InsertEvento } = require("../dao/eventos");
const { PedidoByProtocolo, UpdatePedido } = require("../dao/pedidos");
const { UpdateCliente, ClienteById } = require("../dao/clientes");
const { UsuarioByCpf } = require("../dao/usuarios");

async function validacao(req, res) {
  const {
    protocolo,
    evento,
    responsavelEvento,
    localAtendimento,
    dtLimiteVerificacao,
    nomeAutoridadeRegistro,
    cnpjAutoridadeRegistro,
    cnpjLocalAtendimento,
    documento,
    nomeRazaoSocial,
    numeroTitular,
    logradouroTitular,
    bairroTitular,
    cepTitular,
    nomeMunicipioTitular,
    siglaUFTitular,
    email,
    telefone,
    validacaoExterna,
    dtHoraEvento,
    comVerificacao,
    razaoSocialPosto,
    apelidoPosto,
    tipoMatch,
    tipoEmissao,
    candidataRemocaoACI,
  } = req.body;

  // pega o nome do usuario
  arr = responsavelEvento.split(":");
  console.log(arr);
  cpf = arr[1].trim();

  // pesquisa certificado
  // responvaleEvento nome:cpf - pesquisar o cpf -= jogar em Agende de Validação
  // marcar validação externa :validadeExterna
  // criar campo data de validação com a data do evento

  const pedido = await PedidoByProtocolo(protocolo);

  if (!pedido) {
    return res.status(404).json({ message: "Pedido não encontrado" });
  }

  pedido.datavalidacao = dtHoraEvento;
  pedido.validacaoexterna = validacaoExterna;

  const usuario = await UsuarioByCpf(cpf);
  if (usuario) {
    pedido.idagentevalidacao = usuario.id;
    pedido.idagenteverificacao = usuario.id;
  }

  await UpdatePedido(pedido);

  const cliente = await ClienteById(pedido.idcliente);
  if (cliente) {
    console.log("Cliente do pedido ", cliente.nome);
    cliente.nome = nomeRazaoSocial;
    cliente.identificacao_cnpjcpf = documento;
    cliente.endereco_logradouro = logradouroTitular;
    cliente.endereco_bairro = bairroTitular;
    cliente.endereco_cep = cepTitular;
    cliente.endereco_numero = numeroTitular;
    cliente.contato_telefone = telefone;
    cliente.contato_email = email;
    await UpdateCliente(cliente);
    console.log("Atualizando cliente do pedido ", cliente.nome);
  } else {
    console.log("Cliente do pedido não encontrado ", pedido.idcliente);
  }
  const horaEvento = dtHoraEvento.substring(11, 19);
  const eventoModel = new Evento({
    idpedido: pedido.id,
    tipoevento: evento,
    protocolo: protocolo,
    dataevento: dtHoraEvento.substring(0, 10),
    horaevento: horaEvento,
    evento: evento,
    jsonevento: JSON.stringify(req.body),
  });

  await InsertEvento(eventoModel);

  return res.status(200).json({ message: "Validação notificada com sucesso" });
}

module.exports = {
  validacao,
};

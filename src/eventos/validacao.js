const Evento = require("../models/Evento");
const { InsertEventoWithMessage } = require("../dao/eventos");
const logger = require("../logger");
const {
  PedidoByProtocoloWithMessage,
  UpdatePedido,
} = require("../dao/pedidos");
const { UpdateCliente, ClienteById } = require("../dao/clientes");
const { UsuarioByCpf } = require("../dao/usuarios");
const { format } = require("date-fns");

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

  cpf = arr[1].trim();

  const pedido = await PedidoByProtocoloWithMessage(protocolo, req, res);
  const dataEvento = dtHoraEvento.substring(0, 10);
  const horaEvento = dtHoraEvento.substring(11, 19);

  if (!pedido) {
    return;
  }

  pedido.datavalidacao = dataEvento;
  pedido.validacaoexterna = validacaoExterna;

  const usuario = await UsuarioByCpf(cpf);

  if (usuario) {
    pedido.idagentevalidacao = usuario.id;
    pedido.idagenteverificacao = usuario.id;
  }

  await UpdatePedido(pedido);

  const cliente = await ClienteById(pedido.idcliente);

  if (cliente) {
    cliente.nome = nomeRazaoSocial;
    cliente.identificacao_cnpjcpf = documento;
    cliente.endereco_logradouro = logradouroTitular;
    cliente.endereco_bairro = bairroTitular;
    cliente.endereco_cep = cepTitular;
    cliente.endereco_numero = numeroTitular;
    cliente.contato_telefone = telefone;
    cliente.contato_email = email;
    await UpdateCliente(cliente);
  } else {
  }

  const eventoModel = new Evento({
    idpedido: pedido.id,
    tipoevento: evento,
    protocolo: protocolo,
    dataevento: dataEvento,
    horaevento: horaEvento,
    evento: evento,
    jsonevento: JSON.stringify(req.body),
  });

  await InsertEventoWithMessage(eventoModel, req, res);
}

module.exports = {
  validacao,
};

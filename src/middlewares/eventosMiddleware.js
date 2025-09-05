const { emissao } = require("../eventos/emissao");
const { solicitacao } = require("../eventos/solicitacao");
const { validacao } = require("../eventos/validacao");
const { verificacao } = require("../eventos/verificacao");
const { cancelamento } = require("../eventos/cancelamento");
const { revogacao } = require("../eventos/revogacao");
const { pagamento } = require("../eventos/pagamento");
const { confirmacaoCadastro } = require("../eventos/confirmacaoCadastro");
const { solicitacaoPeriodoUso } = require("../eventos/solicitacaoPeriodoUso");
const { certificadoPeriodoUso } = require("../eventos/certificadoPeriodoUso");
const { validacaoAutonoma } = require("../eventos/validacaoAutonoma");
const {
  cancelamentoSolicitacao,
} = require("../eventos/cancelamentoSolicitacao");

const eventosMiddleware = async (req, res) => {
  console.log("Middleware de eventos acionado", req.body);
  const { evento } = req.body;
  console.log("Processando evento:", evento);

  if (req.body.formaPagamento) {
    await pagamento(req, res);
    return;
  }

  switch (evento) {
    case "emissao":
      await emissao(req, res);
      break;
    case "Solicitação":
      await solicitacao(req, res);
      break;
    case ("validacao", "Validação"):
      await validacao(req, res);
      break;
    case "verificacao":
      await verificacao(req, res);
      break;
    case "Cancelamento":
      await cancelamento(req, res);
      break;
    case "revogacao":
      await revogacao(req, res);
      break;
    case "Confirmação de Cadastro":
      await confirmacaoCadastro(req, res);
      break;
    case "Solicitação Período Uso":
      await solicitacaoPeriodoUso(req, res);
      break;
    case "Certificado Período Uso":
      await certificadoPeriodoUso(req, res);
      break;
    case "Validação Autônoma":
      await validacaoAutonoma(req, res);
      break;
    case "Cancelamento De Solicitação":
      await cancelamentoSolicitacao(req, res);
      break;
    default:
      return res.status(400).json({ error: "Tipo de evento desconhecido" });
  }
};

module.exports = eventosMiddleware;

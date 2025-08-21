const { emissao } = require("../eventos/emissao");
const { solicitacao } = require("../eventos/solicitacao");
const { validacao } = require("../eventos/validacao");
const { verificacao } = require("../eventos/verificacao");
const { cancelamento } = require("../eventos/cancelamento");
const { revogacao } = require("../eventos/revogacao");
const { pagamento } = require("../eventos/pagamento");

const eventosMiddleware = async (req, res) => {
  console.log(req.body);
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
    case "validacao":
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
    // case "Confirmação de Cadastro":
    //   await confirmacaoCadastro(req, res);
    //   break;
    // case "Solicitação Período Uso":
    //   await solicitacaoPeriodoUso(req, res);
    //   break;
    // case "Certificado Período Uso":
    //   await certificadoPeriodoUso(req, res);
    //   break;
    // case "Validação Autônoma":
    //   await validacaoAutonoma(req, res);
    //   break;
    // case "Cancelamento de Solicitação":
    //   await cancelamentoSolicitacao(req, res);
    //   break;
    default:
      return res.status(400).json({ error: "Tipo de evento desconhecido" });
  }
};

module.exports = eventosMiddleware;

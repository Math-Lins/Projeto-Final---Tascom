import * as readlineSync from "readline-sync";

/*
 * === 👾 Jogo do Marciano 👾 ===
 * O pequeno alien se esconde entre os números.
 * Para vencer o jogo e impedir a invasão na Terra, adivinhe com o mínimo de tentativas possíveis onde o pequenino se esconde!
 * Dica: Utilize a aproximação de Newton para resolver da maneira mais lógica possível.
 * Ao iniciar, escolha uma dificuldade e tente adivinhar o número secreto.
 * O jogo dará dicas (maior ou menor) e mostrará o histórico de tentativas.
 */

function obterIntervalo(dificuldade: string): { min: number; max: number } {
  const nivel = dificuldade.toLowerCase();
  if (nivel === "facil") return { min: 1, max: 50 };
  if (nivel === "dificil") return { min: 1, max: 200 };
  return { min: 1, max: 100 };
}

function sortearNumero(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calcularMedia(numeros: number[]): number {
  const soma = numeros.reduce((acc, val) => acc + val, 0);
  return soma / numeros.length;
}

function iniciarJogo(): void {
  console.log("=== 👾 Bem-vindo ao Jogo do Marciano! 👾 ===");

  let dificuldade = readlineSync
    .question("Escolha a dificuldade (facil, medio ou dificil): ")
    .toLowerCase();

  if (!["facil", "medio", "dificil"].includes(dificuldade)) {
    console.log("Dificuldade inválida. Será utilizado 'medio' como padrão.");
    dificuldade = "medio";
  }

  const { min, max } = obterIntervalo(dificuldade);
  const numeroSecreto = sortearNumero(min, max);

  const tentativas: number[] = [];
  let acertou = false;

  console.log(`\n O Marciano está escondido entre ${min} e ${max}...\n`);

  while (!acertou) {
    const entrada = readlineSync.question("Digite sua tentativa: ");
    const palpite = parseInt(entrada);

    if (isNaN(palpite) || palpite < min || palpite > max) {
      console.log("Valor incorreto. Digite um número dentro do intervalo selecionado.");
      continue;
    }

    tentativas.push(palpite);

    if (palpite < numeroSecreto) {
      console.log("📈 O Marciano está em uma posição maior!");
    } else if (palpite > numeroSecreto) {
      console.log("📉 O Marciano está em uma posição menor!");
    } else {
      console.log(
        `VITÓRIA! Você acertou a posição do Marciano com ${tentativas.length} tentativa(s)!`
      );
      acertou = true;
    }

    if (tentativas.length === 3 && !acertou) {
      console.log("💡 Dica: use a lógica! Tente dividir o intervalo ao meio (como faria Newton!).");
    }
  }

  console.log("\n Histórico das tentativas:");
  tentativas.forEach((val, i) => console.log(`Tentativa ${i + 1}: ${val}`));

  const media = calcularMedia(tentativas);
  console.log(`📊 Média dos palpites: ${media.toFixed(2)}`);
}

iniciarJogo();

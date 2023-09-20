export class Chromosome {
  pool: any[];
  depot: any;
  genes: any[];
  length: number;
  mutationRate: number;
  fitness: number;

  constructor(pool = [], depot = {}, mutationRate = 0, genes: any[] = []) {
    this.pool = pool;
    this.depot = depot;
    this.genes = genes;
    this.length = genes.length || pool.length;
    this.mutationRate = mutationRate;
    this.fitness = 0;
    if (!genes.length) this.createGenes();
  }

  createGenes() {
    this.genes.push(this.depot);
    for (let i = 0; i < this.length; i++) {
      const randomLocation = Math.floor(Math.random() * this.length);
      const existing = this.genes.find(
        (gene) => gene.id === this.pool[randomLocation].id
      );

      // Remove duplicated genes
      if (existing) {
        i--;
        continue;
      }
      this.genes.push(this.pool[randomLocation]);
    }
    this.genes.push(this.depot);
    this.length = this.genes.length;
    console.log(this.genes)
  }

  calcFitness() {
    for (let i = 1; i < this.length; i++) {
      let distance = Math.sqrt(
        (this.genes[i - 1].lat - this.genes[i].lat) ** 2 +
          (this.genes[i - 1].lng - this.genes[i].lng) ** 2
      );
      this.fitness += distance;
    }
    this.fitness = 1 / this.fitness;
    return this.fitness;
  }

  crossover(chromosome: Chromosome) {
    let pos = Math.floor(Math.random() * this.length - 1);
    if (pos === 0) pos++;
    let offSpr2Genes: any[] = [],
      offSpr1Genes = this.genes
        .slice(1, pos)
        .concat(chromosome.genes.slice(pos, chromosome.length - 1))
        .concat(this.genes.slice(pos, this.length - 1))
        .concat(chromosome.genes.slice(1, pos));

    for (let i = 0; i + 1 < offSpr1Genes.length; i++) {
      for (let j = i + 1; j < offSpr1Genes.length; j++) {
        if (offSpr1Genes[i].id === offSpr1Genes[j].id) {
          offSpr2Genes = offSpr2Genes.concat(offSpr1Genes.splice(j, 1));
        }
      }
      if (offSpr2Genes.length >= offSpr1Genes.length) break;
    }

    let offspring1 = new Chromosome([], this.depot, this.mutationRate, [
      this.depot,
      ...offSpr1Genes,
      this.depot,
    ]);
    let offspring2 = new Chromosome([], this.depot, this.mutationRate, [
      this.depot,
      ...offSpr2Genes,
      this.depot,
    ]);

    return { offspring1, offspring2 };
  }

  mutate() {
    for (let i = 1; i < this.length - 1; i++) {
      if (Math.random() < this.mutationRate) {
        let random = Math.floor(Math.random() * (this.length - 1));
        if (random === 0) random++;
        [this.genes[random], this.genes[i]] = [
          this.genes[i],
          this.genes[random],
        ];
      }
    }
    return this;
  }
}

export class GA {
  private mutationRate: number;
  private crossoverRate: number;
  private populationSize: number;
  private generationSize: number;
  private pool: any;
  private depot: any;
  private elitism: boolean;
  private currentGeneration: Chromosome[];
  private nextGeneration: Chromosome[];
  private totalFitness: number;

  constructor(
    pool: any,
    depot: any,
    crossoverRate: number = 0,
    mutationRate: number = 0,
    populationSize: number = 1,
    generationSize: number = 0,
    elitism: boolean = true
  ) {
    this.mutationRate = mutationRate;
    this.crossoverRate = crossoverRate;
    this.populationSize = populationSize;
    this.generationSize = generationSize;
    this.pool = pool;
    this.depot = depot;
    this.elitism = elitism;
    this.currentGeneration = [];
    this.nextGeneration = [];
    this.totalFitness = 0;
  }

  public go(): Chromosome[] {
    this.createPopulation();
    this.rankPopulation();
    for (let i = 0; i < this.generationSize; i++) {
      console.log(`${(i / this.generationSize) * 100}%`);
      this.createNextGeneration();
      this.rankPopulation();
    }

    return this.currentGeneration;
  }

  private createPopulation(): void {
    for (let i = 0; i < this.populationSize; i++) {
      const c = new Chromosome(this.pool, this.depot, this.mutationRate);
      this.currentGeneration.push(c);
    }
  }

  private rankPopulation(): void {
    this.totalFitness = 0;
    this.currentGeneration.forEach(
      (chromosome) => (this.totalFitness += chromosome.calcFitness())
    );
    this.currentGeneration.sort((a, b) => a.fitness - b.fitness);
  }

  private createNextGeneration(): void {
    this.nextGeneration = [];
    if (this.elitism) {
      this.nextGeneration.push(this.currentGeneration[this.populationSize - 1]);
    }
    for (let i = 0; i < this.populationSize - 1; i += 2) {
      let child1, child2;
      const parent1 = this.rouletteSelection();
      const parent2 = this.rouletteSelection();
      if (Math.random() < this.crossoverRate) {
        const { offspring1, offspring2 } = parent1.crossover(parent2);
        child1 = offspring1;
        child2 = offspring2;
      } else {
        child1 = parent1;
        child2 = parent2;
      }
      child1.mutate();
      child2.mutate();

      this.nextGeneration.push(child1);
      this.nextGeneration.push(child2);
    }
    this.currentGeneration = [...this.nextGeneration];
  }

  private rouletteSelection(): Chromosome {
    const randomFitness = Math.random() * this.totalFitness;
    let increasingFitness = 0;
    for (let i = 0; i < this.populationSize; i++) {
      increasingFitness += this.currentGeneration[i].fitness;
      if (increasingFitness >= randomFitness) {
        return this.currentGeneration[i];
      }
    }
    return this.currentGeneration[this.populationSize - 1];
  }
}

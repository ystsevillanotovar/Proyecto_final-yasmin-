<template>
  <div class="min-h-screen relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-[#1a0505] via-[#2d0f14] to-[#0d0404]"></div>

    <div class="relative z-10 pt-24 pb-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-4" style="text-shadow:0 0 20px rgba(231,76,60,0.5)">Que es Stranger Home?</h1>
          <div class="stranger-divider w-48 mx-auto mb-6"></div>
          <p class="text-white/60 text-lg max-w-2xl mx-auto">Tu companero de aventuras. La herramienta que te ayuda a decidir tu siguiente juego y registrar cada mundo que has explorado.</p>
        </div>

        <div class="space-y-16">

          <div class="about-block" v-scroll-reveal="{ direction: 'left' }">
            <div class="about-image-wrapper">
              <img src="https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&h=400&fit=crop&crop=center" alt="Mando de videojuegos" class="about-image" loading="lazy" />
              <div class="about-image-overlay"></div>
            </div>
            <div class="about-text-block">
              <div class="flex items-center gap-3 mb-4">
                <div class="about-number">1</div>
                <h2 class="text-2xl font-bold text-white">Agrega tus juegos</h2>
              </div>
              <p class="text-white/60 leading-relaxed">
                Todo empieza aqui. Abres tu cuenta y comienzas a agregar los videojuegos que tienes pendientes, los que estas jugando ahora mismo y los que ya terminaste. Puedes aniadir el nombre, la categoria, las etiquetas y los datos que quieras. Es como tener tu estanteria virtual, pero mucho mas organizada.
              </p>
            </div>
          </div>

          <div class="about-block about-block-reverse" v-scroll-reveal="{ direction: 'right' }">
            <div class="about-image-wrapper">
              <img src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=400&fit=crop&crop=center" alt="Jugando videojuegos" class="about-image" loading="lazy" />
              <div class="about-image-overlay"></div>
            </div>
            <div class="about-text-block">
              <div class="flex items-center gap-3 mb-4">
                <div class="about-number">2</div>
                <h2 class="text-2xl font-bold text-white">Descubre que jugar</h2>
              </div>
              <p class="text-white/60 leading-relaxed">
                No sabes que jugar despues de terminar tu ultimo juego? Stranger Home te lo dice. La app analiza la puntuacion Metacritic de cada juego y las horas estimadas para completarlo, y te muestra una lista de recomendaciones ordenada por prioridad. Asi nunca mas te quedas pensando "y ahora que juego?".
              </p>
            </div>
          </div>

          <div class="about-block" v-scroll-reveal="{ direction: 'left' }">
            <div class="about-image-wrapper">
              <img src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&h=400&fit=crop&crop=center" alt="Setup gaming" class="about-image" loading="lazy" />
              <div class="about-image-overlay"></div>
            </div>
            <div class="about-text-block">
              <div class="flex items-center gap-3 mb-4">
                <div class="about-number">3</div>
                <h2 class="text-2xl font-bold text-white">Marca tus completados</h2>
              </div>
              <p class="text-white/60 leading-relaxed">
                Cuando terminas un juego, lo celebras. Lo marcas como completado, le das tu valoracion de 1 a 5 estrellas, escribes una nota con lo que te parecio y la fecha se guarda automaticamente. Con el tiempo, tu seccion de completados se convierte en un diario de todas tus aventuras. Una coleccion de la que sentirte orgulloso.
              </p>
            </div>
          </div>

          <div class="about-block about-block-reverse" v-scroll-reveal="{ direction: 'right' }">
            <div class="about-image-wrapper">
              <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop&crop=center" alt="Videojuegos coleccion" class="about-image" loading="lazy" />
              <div class="about-image-overlay"></div>
            </div>
            <div class="about-text-block">
              <div class="flex items-center gap-3 mb-4">
                <div class="about-number">4</div>
                <h2 class="text-2xl font-bold text-white">Organiza tu biblioteca</h2>
              </div>
              <p class="text-white/60 leading-relaxed">
                Filtra por categorias, etiquetas o estado. Ordena por nombre, puntuacion, prioridad o lo que necesites en cada momento. Tu biblioteca crece contigo y siempre esta perfectamente ordenada. Sin importar si tienes 10 juegos o 1000, encontrar lo que buscas es facil y rapido.
              </p>
            </div>
          </div>

        </div>

        <div class="mt-20 text-center" v-scroll-reveal="{ direction: 'scale' }">
          <div class="card-neon inline-block p-8 max-w-xl mx-auto">
            <h2 class="text-2xl font-bold text-white mb-3">Entre cientos de mundos por recorrer, tu decides quien quieres ser.</h2>
            <p class="text-white/50 mb-6">Stranger Home es para ti. Da igual si juegas en PC, consola o movil. Da igual si juegas una hora a la semana o diez al dia. Aqui tienes un sitio donde guardar cada aventura.</p>
            <NuxtLink to="/register" class="btn-primary px-8 py-3 rounded-xl font-medium inline-flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
              </svg>
              Empezar ahora
            </NuxtLink>
          </div>
        </div>

        <div class="mt-12 text-center">
          <NuxtLink to="/" class="text-white/40 hover:text-primary transition-colors text-sm inline-flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Volver al inicio
          </NuxtLink>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Que es esto? - Stranger Home'
})
</script>

<style scoped>
.about-block {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: center;
}

@media (min-width: 768px) {
  .about-block {
    grid-template-columns: 1fr 1fr;
  }
}

.about-block-reverse {
  direction: rtl;
}

.about-block-reverse > * {
  direction: ltr;
}

.about-image-wrapper {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 2/1;
}

.about-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.about-image-wrapper:hover .about-image {
  transform: scale(1.05);
}

.about-image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(231, 76, 60, 0.15), rgba(255, 107, 66, 0.1));
  pointer-events: none;
}

.about-number {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 10px;
  background: linear-gradient(135deg, #E74C3C, #FF6B42);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1rem;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 0 15px rgba(231, 76, 60, 0.4);
}
</style>

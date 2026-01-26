<template>
  <!-- 弹窗遮罩层 -->
  <div class="modal-overlay" v-if="isVisible" @click="closeModal">
    <!-- 弹窗容器 -->
    <div class="modal-container" @click.stop>
      <!-- 弹窗头部 -->
      <div class="modal-header">
        <h2>俄罗斯方块</h2>
        <button class="modal-close" @click="closeModal">×</button>
      </div>
      
      <!-- 弹窗内容 -->
      <div class="modal-content">
        <div class="game-wrapper">
          <div class="game-area">
            <div class="grid">
              <div 
                v-for="(row, rowIndex) in displayGrid" 
                :key="'row-' + rowIndex" 
                class="grid-row"
              >
                <div 
                  v-for="(cell, colIndex) in row" 
                  :key="'cell-' + rowIndex + '-' + colIndex" 
                  :class="['grid-cell', { 'cell-filled': cell > 0 }]"
                  :style="{ backgroundColor: getColor(cell) }"
                ></div>
              </div>
            </div>
          </div>
          
          <!-- 侧边栏 -->
          <div class="sidebar">
            <!-- 分数 -->
            <div class="info-panel">
              <div class="info-item">
                <span class="info-label">分数:</span>
                <span class="info-value">{{ score }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">等级:</span>
                <span class="info-value">{{ level }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">行数:</span>
                <span class="info-value">{{ linesCleared }}</span>
              </div>
            </div>
            
            <!-- 下一个方块预览 -->
            <div class="next-piece-panel">
              <h3>下一个方块</h3>
              <div class="next-piece" v-if="nextPiece">
                <div 
                  v-for="(row, rowIndex) in nextPiece.shape" 
                  :key="'next-row-' + rowIndex" 
                  class="piece-row"
                >
                  <div 
                    v-for="(cell, colIndex) in row" 
                    :key="'next-cell-' + rowIndex + '-' + colIndex" 
                    :class="['piece-cell', { 'piece-cell-filled': cell }]"
                    :style="{ backgroundColor: getColor(nextPiece.type) }"
                  ></div>
                </div>
              </div>
            </div>
            
            <!-- 控制按钮 -->
            <div class="controls">
              <button @click="startGame" class="btn start-btn" v-if="!isPlaying">开始游戏</button>
              <button @click="pauseGame" class="btn pause-btn" v-if="isPlaying && !isPaused">暂停</button>
              <button @click="resumeGame" class="btn resume-btn" v-if="isPaused">继续</button>
              <button @click="resetGame" class="btn reset-btn">重置游戏</button>
            </div>
            
            <!-- 操作说明 -->
            <div class="instructions">
              <h3>操作说明</h3>
              <div class="instruction-item">← → 移动</div>
              <div class="instruction-item">↓ 加速下落</div>
              <div class="instruction-item">↑ 旋转</div>
              <div class="instruction-item">空格 直接下落</div>
            </div>
          </div>
        </div>
        
        <!-- 游戏结束提示 -->
        <div class="game-over" v-if="isGameOver">
          <h2>游戏结束</h2>
          <p>最终分数: {{ score }}</p>
          <button @click="resetGame" class="btn restart-btn">重新开始</button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- 打开弹窗按钮 -->
  <button class="btn open-modal-btn" v-if="!isVisible" @click="openModal">打开俄罗斯方块</button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

// 弹窗状态
const isVisible = ref(false);

// 游戏配置
const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 25;
const COLORS = [
  '#000000',  // 空白
  '#FF0000',  // 红色
  '#00FF00',  // 绿色
  '#0000FF',  // 蓝色
  '#FFFF00',  // 黄色
  '#FF00FF',  // 紫色
  '#00FFFF',  // 青色
  '#FFA500',  // 橙色
];

// 方块类型定义
interface Piece {
  type: number;
  shape: number[][];
  x: number;
  y: number;
}

// 方块形状
const PIECE_SHAPES = [
  // 空
  [],
  // I型
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  // J型
  [
    [2, 0, 0],
    [2, 2, 2],
    [0, 0, 0],
  ],
  // L型
  [
    [0, 0, 3],
    [3, 3, 3],
    [0, 0, 0],
  ],
  // O型
  [
    [4, 4],
    [4, 4],
  ],
  // S型
  [
    [0, 5, 5],
    [5, 5, 0],
    [0, 0, 0],
  ],
  // T型
  [
    [0, 6, 0],
    [6, 6, 6],
    [0, 0, 0],
  ],
  // Z型
  [
    [7, 7, 0],
    [0, 7, 7],
    [0, 0, 0],
  ],
];

// 游戏状态
const grid = ref<number[][]>([]);
const currentPiece = ref<Piece | null>(null);
const nextPiece = ref<Piece | null>(null);
const score = ref(0);
const level = ref(1);
const linesCleared = ref(0);
const isPlaying = ref(false);
const isPaused = ref(false);
const isGameOver = ref(false);
const dropInterval = ref(1000); // 方块下落间隔（毫秒）
let dropTimer: number | null = null;

const displayGrid = computed(() => {
  const baseGrid = grid.value.map(row => row.slice());
  if (currentPiece.value) {
    for (let y = 0; y < currentPiece.value.shape.length; y++) {
      for (let x = 0; x < currentPiece.value.shape[y].length; x++) {
        if (currentPiece.value.shape[y][x]) {
          const gridY = currentPiece.value.y + y;
          const gridX = currentPiece.value.x + x;
          if (gridY >= 0 && gridY < ROWS && gridX >= 0 && gridX < COLS) {
            baseGrid[gridY][gridX] = currentPiece.value.type;
          }
        }
      }
    }
  }
  return baseGrid;
});

// 初始化网格
const initGrid = () => {
  grid.value = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
};

// 检查游戏是否可以开始 (no filled cells at top rows)
const canStartGame = (): boolean => {
  // Check top few rows to see if any cells are occupied
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < COLS; x++) {
      if (grid.value[y][x] !== 0) {
        return false;
      }
    }
  }
  return true;
};

// 创建新方块
const createPiece = (type?: number): Piece => {
  const pieceType = type || Math.floor(Math.random() * 7) + 1;
  return {
    type: pieceType,
    shape: PIECE_SHAPES[pieceType],
    x: Math.floor(COLS / 2) - 1,
    y: 0,
  };
};

// 检查碰撞
const checkCollision = (piece: Piece, offsetX = 0, offsetY = 0, checkTopBoundary = true): boolean => {
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const newX = piece.x + x + offsetX;
        const newY = piece.y + y + offsetY;

        // 检查左右和下边界
        if (newX < 0 || newX >= COLS || newY >= ROWS) {
          return true;
        }

        // 检查上方边界，根据参数决定是否检查
        if (checkTopBoundary && newY < 0) {
          return true;
        }

        // 检查是否与已放置的方块碰撞 (only check if within grid bounds)
        if (newY >= 0 && grid.value[newY][newX] !== 0) {
          return true;
        }
      }
    }
  }
  return false;
};

// 旋转方块
const rotatePiece = () => {
  if (!currentPiece.value) return;

  // 确保数组不为空再进行旋转
  if (currentPiece.value.shape.length === 0 || currentPiece.value.shape[0].length === 0) return;

  const rotatedShape = currentPiece.value.shape[0].map((_, index) =>
    currentPiece.value!.shape.map(row => row[index]).reverse()
  );

  const rotatedPiece = {
    ...currentPiece.value,
    shape: rotatedShape,
  };

  if (!checkCollision(rotatedPiece, 0, 0, true)) {
    currentPiece.value = rotatedPiece;
  }
};

// 移动方块
const movePiece = (offsetX: number) => {
  if (!currentPiece.value) return;
  
  const newX = currentPiece.value.x + offsetX;
  const newPiece = {
    ...currentPiece.value,
    x: newX,
  };
  
  if (!checkCollision(newPiece)) {
    currentPiece.value = newPiece;
  }
};

// 下落方块
const dropPiece = () => {
  if (!currentPiece.value) return;
  
  const newY = currentPiece.value.y + 1;
  const newPiece = {
    ...currentPiece.value,
    y: newY,
  };
  
  if (!checkCollision(newPiece)) {
    currentPiece.value = newPiece;
  } else {
    // 方块落地，固定到网格
    placePiece();
    // 生成新方块
    spawnNewPiece();
    // 检查游戏结束 - only check if currentPiece is not null
    if (currentPiece.value && checkCollision(currentPiece.value, 0, 0, true)) {
      endGame();
    }
  }
};

// 固定方块到网格
const placePiece = () => {
  if (!currentPiece.value) return;
  
  for (let y = 0; y < currentPiece.value.shape.length; y++) {
    for (let x = 0; x < currentPiece.value.shape[y].length; x++) {
      if (currentPiece.value.shape[y][x]) {
        const gridY = currentPiece.value.y + y;
        const gridX = currentPiece.value.x + x;
        if (gridY >= 0 && gridX >= 0 && gridX < COLS) {
          grid.value[gridY][gridX] = currentPiece.value.type;
        }
      }
    }
  }
  
  // 检查消除行
  clearLines();
};

// 消除行
const clearLines = () => {
  let linesClearedCount = 0;
  const newGrid = [...grid.value]; // 创建副本以避免在循环中修改原数组

  for (let y = ROWS - 1; y >= 0; y--) {
    if (newGrid[y].every(cell => cell > 0)) {
      // 移除满行
      newGrid.splice(y, 1);
      // 在顶部添加新行
      newGrid.unshift(Array(COLS).fill(0));
      linesClearedCount++;
    }
  }

  if (linesClearedCount > 0) {
    grid.value = newGrid; // 更新原始网格
    linesCleared.value += linesClearedCount;
    // 计算分数
    const lineScores = [0, 100, 300, 500, 800];
    score.value += lineScores[linesClearedCount] * level.value;
    // 升级
    level.value = Math.floor(linesCleared.value / 10) + 1;
    // 增加下落速度
    dropInterval.value = Math.max(100, 1000 - (level.value - 1) * 100);
    if (dropTimer) {
      clearInterval(dropTimer);
      startDropTimer();
    }
  }
};

// 生成新方块
const spawnNewPiece = () => {
  currentPiece.value = nextPiece.value || createPiece();
  nextPiece.value = createPiece();
};

// 获取方块颜色
const getColor = (type: number): string => {
  return COLORS[type] || '#000000';
};

// 开始游戏
const startGame = () => {
  resetGame();
  isPlaying.value = true;
  isPaused.value = false;
  isGameOver.value = false;
  spawnNewPiece();

  // 检查游戏是否可以继续（是否刚开局就失败）
  if (currentPiece.value && checkCollision(currentPiece.value)) {
    endGame();
  } else {
    startDropTimer();
  }
};

// 暂停游戏
const pauseGame = () => {
  isPaused.value = true;
  stopDropTimer();
};

// 继续游戏
const resumeGame = () => {
  isPaused.value = false;
  startDropTimer();
};

// 重置游戏
const resetGame = () => {
  stopDropTimer();
  initGrid();
  currentPiece.value = null;
  nextPiece.value = createPiece();
  score.value = 0;
  level.value = 1;
  linesCleared.value = 0;
  isPlaying.value = false;
  isPaused.value = false;
  isGameOver.value = false;
  dropInterval.value = 1000; // Reset to initial speed
};

// 结束游戏
const endGame = () => {
  isPlaying.value = false;
  isGameOver.value = true;
  stopDropTimer();
};

// 开始下落定时器
const startDropTimer = () => {
  stopDropTimer();
  dropTimer = window.setInterval(() => {
    if (!isPaused.value && isPlaying.value) {
      dropPiece();
    }
  }, dropInterval.value);
};

// 停止下落定时器
const stopDropTimer = () => {
  if (dropTimer) {
    clearInterval(dropTimer);
    dropTimer = null;
  }
};

// 键盘事件处理
const handleKeyDown = (e: KeyboardEvent) => {
  if (!isPlaying.value || isPaused.value || isGameOver.value) return;
  
  switch (e.key) {
    case 'ArrowLeft':
      movePiece(-1);
      break;
    case 'ArrowRight':
      movePiece(1);
      break;
    case 'ArrowDown':
      dropPiece();
      break;
    case 'ArrowUp':
      rotatePiece();
      break;
    case ' ':
      e.preventDefault();
      // 直接下落到底部
      if (currentPiece.value) {
        while (!checkCollision({ ...currentPiece.value, y: currentPiece.value.y + 1 }, 0, 0, true)) {
          currentPiece.value.y++;
        }
        placePiece();
        spawnNewPiece();
        if (currentPiece.value && checkCollision(currentPiece.value, 0, 0, true)) {
          endGame();
        }
      }
      break;
  }
};

// 弹窗控制方法
const openModal = () => {
  isVisible.value = true;
  // 当弹窗打开时，如果游戏未开始，初始化下一个方块
  if (!currentPiece.value && !nextPiece.value) {
    nextPiece.value = createPiece();
  }
};

const closeModal = () => {
  isVisible.value = false;
  // 关闭弹窗时暂停游戏
  if (isPlaying.value) {
    pauseGame();
  }
};

// 生命周期钩子
onMounted(() => {
  initGrid();
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  stopDropTimer();
});
</script>

<style scoped>
/* 弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  max-width: 800px;
  width: 100%;
  overflow: hidden;
  animation: modalFadeIn 0.3s ease;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #f7fafc;
  border-bottom: 1px solid #e2e8f0;
}

.modal-header h2 {
  margin: 0;
  color: #2d3748;
  font-size: 1.5rem;
}

.modal-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #718096;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.modal-close:hover {
  background-color: #e2e8f0;
}

.modal-content {
  padding: 20px;
}

/* 打开弹窗按钮 */
.open-modal-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #48bb78;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  z-index: 999;
  transition: background-color 0.2s;
}

.open-modal-btn:hover {
  background-color: #38a169;
}

/* 游戏容器 */
.tetris-container {
  text-align: center;
  font-family: Arial, sans-serif;
}

h2 {
  color: #2d3748;
  margin-bottom: 20px;
  font-size: 2rem;
  font-weight: 600;
}

.game-wrapper {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

/* 游戏主区域 */
.game-area {
  position: relative;
  width: calc(10 * 25px);
  height: calc(20 * 25px);
  border: 2px solid #4a5568;
  background-color: #f7fafc;
}

/* 网格 */
.grid {
  width: 100%;
  height: 100%;
}

.grid-row {
  display: flex;
}

.grid-cell {
  width: 25px;
  height: 25px;
  border: 1px solid #e2e8f0;
  box-sizing: border-box;
}

.cell-filled {
  border: 1px solid #cbd5e0;
}

/* 当前方块 */
.current-piece {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}

.piece-row {
  display: flex;
}

.piece-cell {
  width: 25px;
  height: 25px;
  box-sizing: border-box;
}

.piece-cell-filled {
  border: 1px solid rgba(255, 255, 255, 0.5);
}

/* 侧边栏 */
.sidebar {
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 信息面板 */
.info-panel {
  background-color: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 15px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-label {
  font-weight: 600;
  color: #4a5568;
}

.info-value {
  color: #2d3748;
  font-size: 1.2rem;
}

/* 下一个方块预览 */
.next-piece-panel {
  background-color: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 15px;
}

.next-piece-panel h3 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #4a5568;
  font-size: 1rem;
}

.next-piece {
  display: flex;
  justify-content: center;
}

/* 控制按钮 */
.controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn {
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  color: white;
}

.start-btn {
  background-color: #48bb78;
}

.start-btn:hover {
  background-color: #38a169;
}

.pause-btn {
  background-color: #ed8936;
}

.pause-btn:hover {
  background-color: #dd6b20;
}

.resume-btn {
  background-color: #4299e1;
}

.resume-btn:hover {
  background-color: #3182ce;
}

.reset-btn {
  background-color: #e53e3e;
}

.reset-btn:hover {
  background-color: #c53030;
}

.restart-btn {
  background-color: #48bb78;
  margin-top: 10px;
}

.restart-btn:hover {
  background-color: #38a169;
}

/* 操作说明 */
.instructions {
  background-color: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 15px;
}

.instructions h3 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #4a5568;
  font-size: 1rem;
}

.instruction-item {
  margin-bottom: 5px;
  color: #4a5568;
  font-size: 0.9rem;
}

/* 游戏结束 */
.game-over {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.95);
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  text-align: center;
  z-index: 10;
}

.game-over h2 {
  margin-top: 0;
  color: #e53e3e;
}

.game-over p {
  font-size: 1.2rem;
  color: #4a5568;
}
</style>

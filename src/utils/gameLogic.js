export function getFutureState(regret) {
  if (regret < 30) return 'stable'
  if (regret < 60) return 'warning'
  return 'danger'
}

export function getStateEmoji(state) {
  const map = { stable: '😌', warning: '😰', danger: '😵' }
  return map[state] || '❓'
}

export function getStateLabel(state) {
  const map = {
    stable: 'Stable Path',
    warning: 'Pressure Building',
    danger: 'Collapse Imminent'
  }
  return map[state] || 'Unknown'
}

export function getStateDescription(state) {
  const map = {
    stable: 'You are on track. Keep going.',
    warning: 'Things are slipping. Act now.',
    danger: 'Critical. One more skip and you crash.'
  }
  return map[state] || ''
}

export function getRegretColor(regret) {
  if (regret < 30) return '#00ff88'
  if (regret < 60) return '#ffaa00'
  return '#ff3366'
}

export function getActionConfig(type) {
  const configs = {
    study: {
      label: 'Study Now',
      sublabel: '→ Stabilize',
      regretChange: -8,
      color: '#00ff88',
      icon: '📚',
      message: 'You chose discipline. Future brightens.'
    },
    skip: {
      label: 'Skip',
      sublabel: '→ Risk It',
      regretChange: 10,
      color: '#ff3366',
      icon: '⏭️',
      message: 'You just increased future pressure.'
    },
    focus: {
      label: 'Focus 10 min',
      sublabel: '→ Recover',
      regretChange: -5,
      color: '#00aaff',
      icon: '🎯',
      message: 'Small focus. Real progress.'
    },
    distracted: {
      label: 'Got Distracted',
      sublabel: '→ Lost Time',
      regretChange: 7,
      color: '#ff6600',
      icon: '📱',
      message: 'Distraction is a slow poison.'
    }
  }
  return configs[type] || configs.skip
}

export function detectPattern(decisions) {
  if (decisions.length < 3) return null
  const last3 = decisions.slice(-3).map(d => d.type)
  if (last3.every(t => t === 'skip')) return '3 skips in a row. Your future is crumbling.'
  if (last3.every(t => t === 'distracted')) return '3 distractions. You\'re losing grip.'
  if (last3.every(t => t === 'study')) return '3 studies straight. You\'re building momentum!'
  if (last3.every(t => t === 'focus')) return '3 focus sessions. Discipline is forming.'
  return null
}

export function getInsight(regret, decisions, streak) {
  const pattern = detectPattern(decisions)
  if (pattern) return pattern

  if (regret >= 70) return 'You are one decision away from disaster.'
  if (regret >= 50) return 'You usually fail after 2 skips.'
  if (regret < 20 && streak >= 3) return `${streak}-day streak. You\'re unstoppable.`
  if (regret < 30) return 'Stay consistent. You\'re doing well.'

  const skips = decisions.filter(d => d.type === 'skip').length
  if (skips > 5) return `${skips} total skips. Patterns don\'t lie.`

  return 'Every decision writes your future.'
}

export function getRegretMessage(regret) {
  if (regret >= 80) return 'Collapse Imminent'
  if (regret >= 60) return 'Danger Zone'
  if (regret >= 40) return 'Pressure Building'
  if (regret >= 20) return 'Slightly Unstable'
  return 'Stable Path'
}

export function checkDailyReset(state) {
  const today = new Date().toISOString().split('T')[0]
  if (state.lastCheckIn !== today) {
    return {
      shouldReset: true,
      message: state.regret > 50
        ? 'Today can still be fixed. But act now.'
        : 'New day. New chance. Don\'t waste it.'
    }
  }
  return { shouldReset: false, message: null }
}

import { useEffect } from 'react';
import { LoggerLevel } from '../types';

export default function useLogger(message: any, level: LoggerLevel = 'log')
{
  useEffect(() => {
    console[level](message);
  }, [message]);
}
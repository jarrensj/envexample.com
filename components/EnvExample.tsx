'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import JSConfetti from 'js-confetti'

export default function EnvExample() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const jsConfettiRef = useRef<JSConfetti | null>(null)

  useEffect(() => {
    jsConfettiRef.current = new JSConfetti();
    return () => {
      jsConfettiRef.current = null;
    };
  }, []);

  const generateExample = () => {
    const lines = input.split("\n")
    const sampleLines = lines.map(line => {
      const [key] = line.split("=")
      return key ? `${key.trim()}=` : line
    })
    setOutput(sampleLines.join("\n"))
    if (jsConfettiRef.current) {
      jsConfettiRef.current.addConfetti({
        emojis: ['🚀'],
        emojiSize: 100,
        confettiNumber: 24,
      })
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output)
      if (jsConfettiRef.current) {
        jsConfettiRef.current.addConfetti({
          emojis: ['📋'],
          emojiSize: 100,
          confettiNumber: 24,
        })
      }
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const downloadExample = () => {
    const blob = new Blob([output], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'env example file'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    if (jsConfettiRef.current) {
      jsConfettiRef.current.addConfetti({
        emojis: ['💾'],
        emojiSize: 100,
        confettiNumber: 24,
      })
    }
  }

  return (
    <div className="w-full max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>.env.example Generator</CardTitle>
          <CardDescription>Paste your .env file content to generate a .env.example file</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste your .env content here…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[200px]"
          />
          <Button onClick={generateExample} disabled={!input.trim()}>
            Generate Example
          </Button>
          {output && (
            <div className="space-y-2">
              <Textarea
                value={output}
                readOnly
                className="min-h-[200px] bg-muted text-muted-foreground"
              />
              <div className="flex justify-end gap-2">
                <Button 
                  onClick={copyToClipboard}
                  variant="outline"
                  size="sm"
                >
                  Copy to Clipboard
                </Button>
                <Button 
                  onClick={downloadExample}
                  variant="outline"
                  size="sm"
                >
                  Download
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

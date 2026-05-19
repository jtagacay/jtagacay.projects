import type {
    Reporter,
    TestCase,
    TestResult,
    FullResult
} from '@playwright/test/reporter'

class LogProgressReporter implements Reporter {
    private dots = ['', '.', '..', '...']
    private dotIndex = 0
    private interval?: NodeJS.Timeout
    private currentTestName = ''
    private totalLogs = 0

    onTestBegin(test: TestCase) {
        this.currentTestName = test.title
        this.totalLogs = 0

        this.interval = setInterval(() => {
            const message =
                `|>>> FINAL LOG SUMMARY FOR: ${this.currentTestName} | Retrieving logs${this.dots[this.dotIndex]} Total logs collected: ${this.totalLogs} <<<|`

            process.stdout.write(`\r${message}`)

            this.dotIndex = (this.dotIndex + 1) % this.dots.length
        }, 300)
    }

    onStepEnd() {
        this.totalLogs++
    }

    onTestEnd(test: TestCase, result: TestResult) {
        if (this.interval) {
            clearInterval(this.interval)
            this.interval = undefined
        }

        process.stdout.write(
            `\r|>>> FINAL LOG SUMMARY FOR: ${test.title} | Total logs collected: ${this.totalLogs} <<<|\n`
        )
    }

    onEnd(result: FullResult) {
        process.stdout.write(`\nFinished with status: ${result.status}\n`)
    }
}

export default LogProgressReporter
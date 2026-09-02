# PowerShell script to generate spoken speech audio files using Windows System.Speech

Add-Type -AssemblyName System.Speech

$outputDir = "d:\LAWVOX\frontend\public\audio"
if (!(Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force
}

$cases = @(
    @{
        filename = "kesavananda-bharati.mp3"
        text = "Welcome to LAWVOX. This is the landmark judgment of Kesavananda Bharati versus State of Kerala, 1973, Supreme Court of India. Chapter 1: The Genesis of the Dispute. His Holiness Kesavananda Bharati challenged the Kerala Land Reforms Act under Article 26 of the Constitution. Chapter 2: The Article 368 Controversy. The central constitutional question was whether Parliament has unlimited power under Article 368 to amend any provision of the Constitution, including Fundamental Rights in Part 3. Chapter 3: The 13-Judge Constitutional Bench. After 68 days of hearing, the Supreme Court delivered the historic verdict. Chapter 4: The Basic Structure Doctrine. The Supreme Court held that Parliament cannot alter, damage, or destroy the basic structure or essential framework of the Constitution. Judicial review, secularism, democracy, and fundamental liberties remain inviolable."
    },
    @{
        filename = "maneka-gandhi.mp3"
        text = "Welcome to LAWVOX. Maneka Gandhi versus Union of India, 1978, Supreme Court of India. Chapter 1: Impounding of Passport. The government impounded Maneka Gandhi's passport under Section 10(3)(c) of the Passports Act in public interest without providing reasons. Chapter 2: Expansion of Article 21. The 7-judge bench held that procedure established by law must not be arbitrary, fanciful, or oppressive. Chapter 3: The Golden Triangle. Articles 14, 19, and 21 are mutually interconnected. Any state action depriving personal liberty must be just, fair, and reasonable. Chapter 4: Principles of Natural Justice. The right to a fair hearing is an intrinsic requirement under Article 21."
    },
    @{
        filename = "shreya-singhal.mp3"
        text = "Welcome to LAWVOX. Shreya Singhal versus Union of India, 2015, Supreme Court of India. Chapter 1: Challenge to Section 66A of the Information Technology Act. A public interest litigation challenged arbitrary arrests made for online social media posts. Chapter 2: Article 19(1)(a) and Reasonable Restrictions. The Supreme Court held that Section 66A did not fall under any permissible restrictions under Article 19(2). Chapter 3: Discussion versus Incitement. The court held that discussion and advocacy of unpopular causes are constitutionally protected. Chapter 4: Striking Down Section 66A. The Supreme Court struck down Section 66A in its entirety as unconstitutionally vague and overbroad."
    },
    @{
        filename = "puttaswamy.mp3"
        text = "Welcome to LAWVOX. Justice K.S. Puttaswamy versus Union of India, 2017, Supreme Court of India. Chapter 1: The Aadhaar Reference. A 9-judge constitutional bench was formed to determine whether privacy is a fundamental right. Chapter 2: Inherent Natural Right. The Supreme Court unanimously ruled that the Right to Privacy is an inalienable fundamental right under Article 21. Chapter 3: The Proportionality Test. State restrictions on privacy must satisfy legality, legitimate state aim, and strict necessity. Chapter 4: Overruling ADM Jabalpur. The court formally overruled the emergency habeas corpus precedent, reaffirming the supremacy of human dignity."
    },
    @{
        filename = "vishaka.mp3"
        text = "Welcome to LAWVOX. Vishaka versus State of Rajasthan, 1997, Supreme Court of India. Chapter 1: The Bhanwari Devi Case. Following a brutal assault on a social worker, women's rights groups approached the Supreme Court under Article 32. Chapter 2: Application of CEDAW Conventions. In the absence of specific legislation, the Supreme Court formulated binding guidelines to prevent workplace sexual harassment. Chapter 3: Internal Complaints Framework. The court mandated the creation of internal complaints committees and safe working conditions for women across all institutions."
    },
    @{
        filename = "olga-tellis.mp3"
        text = "Welcome to LAWVOX. Olga Tellis versus Bombay Municipal Corporation, 1985, Supreme Court of India. Chapter 1: Eviction of Pavement Dwellers. Municipal authorities initiated eviction of slum and pavement dwellers without prior notice. Chapter 2: Right to Livelihood in Article 21. Chief Justice Chandrachud ruled that the right to livelihood is an integral part of the right to life. Chapter 3: Natural Justice and Rehabilitation. Evictions cannot be carried out without procedural fairness and reasonable opportunity to be heard."
    }
)

foreach ($item in $cases) {
    $filePath = Join-Path $outputDir $item.filename
    Write-Host "Synthesizing voice audio for $($item.filename)..."
    
    $synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
    $synth.Rate = 0 # Normal speech speed
    $synth.Volume = 100
    
    # Save as standard PCM WAV (which browsers play as mp3 or wav seamlessly)
    $synth.SetOutputToWaveFile($filePath)
    $synth.Speak($item.text)
    $synth.Dispose()
    
    Write-Host "Generated spoken voice audio: $($item.filename)"
}

Write-Host "All spoken legal voice audios generated successfully in $outputDir!"

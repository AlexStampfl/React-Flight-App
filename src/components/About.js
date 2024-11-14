import React from 'react';

function About(props) {
    return (
        <div className="container">
            <div className="row mb-5">
            <br />
                <h1 className="text-left">About Flight App</h1>
                <br />
                <div className="col-lg-15 bg-light border p-4 bg-light rounded">
                    <p className="text-left">
                        Flight App is a project used for the Full-Stack Web Dev Certificate.<br />
                        <br />
                        TypeScript and Python top RedMonk's recent rankings of programming languages, based on data from Github and Stack Overflow.<br />
                        <br />
                        One thing that can help you with your coding career is knowing which programming languages are the most popular -- though they may or may not be the right ones for you to know. In fact, it may help you position yourself better as an expert if you know one that isn't popular; or you may just want to know how to code in popular ones to expose yourself to the most jobs.
                        <br />
                        <br />
                        RedMonk analyzes Github and STack Overflow to figure out what the popular programming languages are. Here are the five notible programming lanugages.
                        <br />
                        <br />
                        SEE: Implementing DevOps: A guide to IT pros (free PDF) (TechRepublic)
                        <br />
                        <br />
                        <ul>
                            <li>Microsoft-maintainted TypeScript. Starting in June, it became the first new langauge to enter the top 10 and stay there for more than a quarter since 2014. TypeScript works well with the existing JavaScript codebase with the potential to make safer code.</li>
                            <li>Python. It's always been in the top five, but in the last year it has risen toward the top. It's generally considered versatile and easy to use.</li>
                            <li>R. It rose two slots to the 13th most popular on RedMonk's list, and you probably haven't heard of it - unless you operate on data. RedMonk calls it "an example of the power of an acedemia-supported community to elevate a language beyond it's expected threshold.</li>
                            <li>Dart. Or should we say Flutter? Because the Dart language took off with the popularity of the Flutter UI toolkit that went 1.0 a year ago.</li>
                            <li>Kotlin. This langauge is popular with the Android developers and seems to be holding onto that popularity in the face of competition from other languages used to run software on the Java Virtual Machile, like Clojure, Scala, and even Groovy. It's not what you know, it's...well, with programming, it really is largely what you know and hopefully this list will help you understand a few more of the options.</li>
                        </ul>
                    </p>
                </div>

            </div>
        </div>
    )
}

export default About
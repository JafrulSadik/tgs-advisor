import { getTeamMembers } from "@/app/actions/team-action";
import Hand from "@/public/images/our-team/hand.svg";
import Image from "next/image";

export default async function IndustrySpecialist() {
  const { data: teamMembers } = await getTeamMembers();

  return (
    <div className="py-10">
      <div className="max-w-4xl w-[90%] mx-auto text-center">
        <h2 className="text-xl md:text-4xl font-bold leading-tight">
          Industry Specialists. Global Standards. Real Impact
          <span className="relative inline-block ml-2">
            <Image src={Hand} alt="hand" className="inline-block w-10 " />
          </span>
        </h2>

        <p className="text-lg mt-4">
          A multidisciplinary team of strategists, engineers, HR leaders and
          industry advisors committed to transforming organizations with
          precision, expertise and measurable results.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="relative z-20 py-2 md:py-3 px-3 md:px-14 w-auto bg-blue mx-4 rounded-2xl md:rounded-3xl my-10 flex justify-center">
          <h2 className="text-white text-center font-semibold text-xl md:text-2xl">
            Some of Our Key Specialist
          </h2>
        </div>
      </div>

      <div className="space-y-10 md:space-y-15 w-[90%] max-w-6xl mx-auto md:my-10">
        {teamMembers?.map((member) => (
          <div
            className="flex flex-col md:flex-row gap-6 items-center md:items-start"
            key={member.id}
          >
            <div className="w-40 shrink-0">
              <Image
                src={member.image || ""}
                alt={member.name}
                width={160}
                height={160}
                className="rounded-lg object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="pl-2">
                <h2 className="text-xl md:text-2xl font-bold tracking-wide">
                  {member.name}
                </h2>

                <p className="font-bold tracking-wide">
                  {member.designation}, {member.company}.
                </p>

                {member.education && (
                  <p className="font-semibold tracking-wide">
                    {member.education}
                  </p>
                )}
                {member.specialization && (
                  <p className="font-semibold tracking-wide">
                    {member.specialization}
                  </p>
                )}
              </div>

              <div
                className="ProseMirror"
                dangerouslySetInnerHTML={{
                  __html:
                    member?.description?.replace(/<p><\/p>/g, "<br/>") ?? "",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <div className="relative z-20 py-2 md:py-3 px-3 md:px-14 w-auto max-w-[90%] bg-blue rounded-2xl md:rounded-3xl my-10 flex justify-center">
          <h2 className="text-white text-center font-semibold text-xl md:text-2xl">
            Why Our Team Stands Apart
          </h2>
        </div>
      </div>

      <div className="max-w-5xl w-[90%] mx-auto">
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <div className="size-1.5 rounded-full bg-blue mt-2" />
            <p className="flex-1">
              <span className="font-bold">Cross functional expertise</span>{" "}
              across RMG, HR, supply chain, leadership, financial systems and
              strategy.
            </p>
          </li>
          <li className="flex items-start gap-2">
            <div className="size-1.5 rounded-full bg-blue mt-2" />
            <p className="flex-1">
              <span className="font-bold">Real industry experience</span> not
              academic theory, delivered by people who’ve run factories, led
              departments and executed transformations.
            </p>
          </li>
          <li className="flex items-start gap-2">
            <div className="size-1.5 rounded-full bg-blue mt-2" />
            <p className="flex-1">
              <span className="font-bold">Global exposure</span> through
              international certifications, cross-border consultancy and best
              practice methodology.
            </p>
          </li>
          <li className="flex items-start gap-2">
            <div className="size-1.5 rounded-full bg-blue mt-2" />
            <p className="flex-1">
              <span className="font-bold">Result focused implementation</span>,
              ensuring clients see measurable outcomes, not just presentations.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

{
  /* <div className="">
          <Image
            src={CEO}
            alt="profile"
            className="w-full md:w-[260px] md:float-left md:mr-6 mb-4 rounded-lg object-cover"
          />

          <div>
            <div className="space-y-1 mb-5">
              <h2 className="text-xl md:text-2xl font-bold tracking-wide">
                Engr Abdul Hadi
              </h2>
              <p className="font-bold tracking-wide">Founder & CEO</p>
              <p>TGS Advisor</p>
              <p className="">RMG Consultancy services</p>
            </div>
            <p className="text-sm: md:text-base text-justify">
              Engineer Abdul Hadi brings over a decade of deep, hands-on
              experience in textile engineering and RMG operations, training,
              and advisory. With a BSc in Textile Engineering and ten years
              spent improving factory performance across the RMG sector, he has
              guided manufacturers in boosting productivity, strengthening
              compliance and driving process optimisation that delivers
              measurable results.
            </p>
            <br />
            <p className="text-sm: md:text-base text-justify">
              TGS Advisor is the culmination of his industry expertise offering
              specialised RMG consultancy, production excellence solutions and
              end to end operational optimisation. Through data driven methods
              and factory floor insight, TGS Advisor helps RMG and textile
              businesses scale efficiently, operate lean and meet global
              performance standards with confidence.
            </p>
          </div>
        </div>

        <div className="">
          <Image
            src={TechnicalSpecialist}
            alt="profile"
            className="w-full aspect-square md:w-[260px] md:float-left md:mr-6 mb-4 rounded-lg object-cover"
          />

          <div>
            <div className="space-y-1 mb-5">
              <h2 className="text-xl md:text-2xl font-bold tracking-wide">
                Md. Motiur Rahman
              </h2>
              <p className="font-bold tracking-wide">Technical Specialist</p>
              <p>Technical Director in TGS Advisor</p>
            </div>
            <p className="text-sm: md:text-base text-justify">
              Mr. Md. Motiur Rahman is a highly skilled and proven professional
              with over 20 years of experience in the Garments Industry. He
              currently plays a vital role as the Technical Director at TGS
              Advisor.
            </p>
            <br />
            <p className="text-sm: md:text-base text-justify">
              <span className="font-semibold">Sewing Expert :</span> He is
              proficient in operating all types of sewing machines and possesses
              exceptional expertise in every stage of the sewing process.
              <br />
              <br />
              <span className="font-semibold">As a Quality Expert :</span> He
              has profound knowledge and experience in garment quality control
              and assurance. He is adept at ensuring the best output while
              maintaining international standards. Vast Experience: In his
              career spanning over two decades, he has achieved remarkable
              success in production, quality and technical management within the
              garments sector. Mr. Motiur Rahman is committed to leading TGS
              Advisor towards success with his deep technical knowledge and
              leadership. His expertise is instrumental in enhancing the
              company&apos;s production capacity and improving product quality
            </p>
          </div>
        </div>

        <div className="">
          <Image
            src={Hr}
            alt="profile"
            className="w-full aspect-square md:w-[260px] md:float-left md:mr-6 mb-4 rounded-lg object-cover object-top"
          />

          <div>
            <div className="space-y-1 mb-5">
              <h2 className="text-xl md:text-2xl font-bold tracking-wide">
                Md. Emdadul Karim
              </h2>
              <p className="font-bold tracking-wide">
                Serviq BPO Limited - Chief HR Consultant (ITES and HRBPO)
              </p>
              <p>HR Development Specialist in TGS Advisor</p>
            </div>
            <p className="text-sm: md:text-base text-justify">
              Md. Emdadul Karim is a veteran HR leader with over two decades of
              experience shaping human capital strategy and organizational
              development across RMG, retail, hi tech, manufacturing, service,
              and hospitality sectors. Having served as Head of HR, Group HR
              Leader, GM (Process Development) and Chief HR Consultant, he has
              led major transformations in talent management, competency based
              recruitment, KPI/OKR driven performance systems, leadership
              development and organizational culture building
            </p>
            <br />
            <p className="text-sm: md:text-base text-justify">
              His career spans building end to end HR frameworks TNA to MDP,
              succession pipelines, HR automation, KPI architecture, OD
              restructuring and nationwide hiring operations for major brands.
              He has designed and delivered high impact training programs for
              managers, supervisors and frontline teams across Bangladesh’s top
              corporations. His work has directly improved workforce capability,
              structural efficiency and strategic alignment at scale.
            </p>
            <br />
            <p className="text-sm: md:text-base text-justify">
              At TGS Advisor, he operates as the HR Development Specialist,
              guiding organizations to modernize HR systems, elevate people
              capability, strengthen leadership pipelines and build performance
              driven cultures that accelerate business growth. His approach
              blends strategic clarity with practical implementation, enabling
              companies to unlock the full potential of their teams and operate
              at global HR standard
            </p>
          </div>
        </div>

        <div className="">
          <Image
            src={PlanningHead}
            alt="profile"
            className="w-full aspect-square md:w-[260px] md:float-left md:mr-6 mb-4 rounded-lg object-cover object-top"
          />

          <div>
            <div className="space-y-1 mb-5">
              <h2 className="text-xl md:text-2xl font-bold tracking-wide">
                Md Sadequr Rahman
              </h2>
              <p className="font-bold tracking-wide">
                Central Planning Head, Textown Ltd.
              </p>
              <p>Bsc in Textiles & Production Engineering ( BUET)</p>
              <p>Specialist Trainer in TGS Advisor</p>
            </div>
            <p className="text-sm: md:text-base text-justify">
              Md. Sadequr Rahman is a seasoned RMG planning and supply chain
              specialist with 17 years of transformative experience across
              leading textile and apparel groups in Bangladesh. A graduate of
              BUET in Industrial & Production Engineering, he has held senior
              leadership roles including GM (Planning), DGM (Central Planning),
              and Head of Planning & Supply Chain in large composite setups,
              driving factory wide performance improvements from yarn to
              shipment.
            </p>
            <br />
            <p className="text-sm: md:text-base text-justify">
              His expertise spans capacity planning, production control, Lean
              systems, IE, centralized planning frameworks, KPI driven execution
              and factory floor performance engineering. He has trained factory
              management teams through BKMEA and implemented Lean and IE tools
              across numerous facilities, achieving major breakthroughs in
              efficiency, lost time reduction and operational flow.
              <br />
              At TGS Advisor, he serves as a Senior Trainer & RMG Systems
              Specialist, bringing deep technical insight and hands on
              experience to elevate factory performance, optimise planning
              architecture and strengthen end to end supply chain execution for
              textile and RMG operations aiming for global standard excellence.
            </p>
          </div>
        </div>

        <div className="">
          <Image
            src={MCMI}
            alt="profile"
            className="w-full aspect-square md:w-[260px] md:float-left md:mr-6 mb-4 rounded-lg object-cover object-top"
          />

          <div>
            <div className="space-y-1 mb-5">
              <h2 className="text-xl md:text-2xl font-bold tracking-wide">
                Gazi Mohammad Al Amin
              </h2>
              <p className="font-bold tracking-wide">MCMI, MIoL, AFA, MIPA</p>
              <p>Executive Chairman, STP Advisory Int’l</p>
              <p>
                Business Strategy & Organizational Systems Specialist in TGS
                Advisor
              </p>
            </div>
            <p className="text-sm: md:text-base text-justify">
              Gazi Mohammad Al Amin is an internationally accredited management
              professional with 15 years of experience in strategic advisory,
              organizational systems development and multi sector consulting
              across Bangladesh and the United Kingdom. Holding memberships with
              the Chartered Management Institute (UK), Institute of Leadership
              (UK) and professional accounting bodies in Australia and the UK,
              he brings a rare blend of financial insight, operational rigor,
              and leadership expertise.
              <br />
              <br />
              With a portfolio of 50+ advisory and consultancy projects, he has
              worked across government mega initiatives, public investment
              programs, RMG and textiles, manufacturing, chemicals, FMCG,
              construction and international development projects with global
              firms such as SMEC and IMC Worldwide. His work spans performance
              assessment, business process optimization, financial structuring,
              governance enhancement and project-level strategic intervention.
              <br />
              <br />
              At TGS Advisor, he serves as a Trainer & Specialist in Business
              Strategy and Organizational Systems, guiding companies to adopt
              globally aligned management practices, strengthen decision making
              frameworks, optimize operational workflows and build sustainable,
              scalable structures. His approach bridges international standards
              with practical on ground execution empowering textile, RMG and
              industrial businesses to elevate competitiveness and accelerate
              long term growth.
            </p>
          </div>
        </div>

        <div className="">
          <Image
            src={ManagingDirector}
            alt="profile"
            className="w-full aspect-square md:w-[260px] md:float-left md:mr-6 mb-4 rounded-lg object-cover object-top"
          />

          <div>
            <div className="space-y-1 mb-5">
              <h2 className="text-xl md:text-2xl font-bold tracking-wide">
                Capt. Sheikh Arif Ahmed (Retired)
              </h2>
              <p className="font-bold tracking-wide">Managing Director</p>
              <p className="font-bold tracking-wide">ZISATEX</p>
              <p>
                Senior Advisor (Business Strategy & Industry Partnerships) in
                TGS Advisor
              </p>
            </div>
            <p className="text-sm: md:text-base text-justify">
              Capt. Sheikh Arif Ahmed (Retired) brings a distinguished blend of
              military discipline and executive leadership to TGS Advisor. As
              the Managing Director of Zisatex Ltd, a 100% export oriented knit
              manufacturer, he has spent years steering large scale operations,
              strengthening global buyer relationships and driving sustainable
              business growth within the RMG sector.
              <br />
              <br />
              His career reflects a rare combination of strategic clarity,
              operational command and industry foresight. From leading teams
              with precision to navigating complex manufacturing and export
              environments, he has consistently delivered strong organizational
              outcomes and long term business stability
              <br />
              <br />
              At TGS Advisor, he serves in an honorary capacity as Senior
              Advisor for Business Strategy & Industry Partnerships, helping
              guide the firm’s strategic direction, strengthen industry
              alliances and open new pathways for growth. His leadership
              perspective and sector-wide network add depth, credibility and
              strategic advantage to TGS Advisor’s mission of elevating RMG and
              manufacturing organizations to global standards
            </p>
          </div>
        </div> */
}
